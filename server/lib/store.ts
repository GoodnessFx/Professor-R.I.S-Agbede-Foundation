import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type DonationProvider = 'paystack' | 'flutterwave' | 'crypto';
export type DonationStatus =
  | 'initialized'
  | 'pending'
  | 'successful'
  | 'failed'
  | 'cancelled'
  | 'awaiting_manual_confirmation';

export interface DonationRecord {
  id: string;
  fullName: string | null;
  email: string | null;
  anonymous: boolean;
  amount: number;
  currency: string;
  provider: DonationProvider;
  method: string;
  network?: string;
  reference: string;
  processorTransactionId?: string;
  txHash?: string;
  paymentLink?: string;
  paymentChannel?: string;
  status: DonationStatus;
  message?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface DonationDb {
  donations: DonationRecord[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'donations.json');

let writeQueue = Promise.resolve();

async function ensureDb() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DATA_FILE, 'utf8');
  } catch {
    await writeFile(DATA_FILE, JSON.stringify({ donations: [] } satisfies DonationDb, null, 2), 'utf8');
  }
}

async function readDb(): Promise<DonationDb> {
  await ensureDb();
  const contents = await readFile(DATA_FILE, 'utf8');
  const parsed = JSON.parse(contents) as Partial<DonationDb>;

  return {
    donations: Array.isArray(parsed.donations) ? parsed.donations : [],
  };
}

async function writeDb(db: DonationDb) {
  await writeFile(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
}

function withWriteLock<T>(task: () => Promise<T>) {
  const next = writeQueue.then(task, task);
  writeQueue = next.then(() => undefined, () => undefined);
  return next;
}

export async function listDonations(limit = 20) {
  const db = await readDb();

  return [...db.donations]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, Math.max(limit, 1));
}

export async function getDonation(reference: string) {
  const db = await readDb();
  return db.donations.find((donation) => donation.reference === reference) ?? null;
}

export async function createDonation(record: DonationRecord) {
  return withWriteLock(async () => {
    const db = await readDb();
    db.donations.unshift(record);
    await writeDb(db);
    return record;
  });
}

export async function updateDonation(
  reference: string,
  updater: (record: DonationRecord) => DonationRecord,
) {
  return withWriteLock(async () => {
    const db = await readDb();
    const index = db.donations.findIndex((donation) => donation.reference === reference);

    if (index === -1) {
      return null;
    }

    db.donations[index] = updater(db.donations[index]);
    await writeDb(db);
    return db.donations[index];
  });
}

export async function patchDonation(reference: string, patch: Partial<DonationRecord>) {
  return updateDonation(reference, (record) => ({
    ...record,
    ...patch,
    updatedAt: new Date().toISOString(),
  }));
}
