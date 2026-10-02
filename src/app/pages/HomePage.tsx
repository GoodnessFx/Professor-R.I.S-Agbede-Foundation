/**
 * Home page — bulletproof version.
 * Every section is plain markup. If any section throws, the error boundary
 * below still renders the rest of the page. The app can NEVER go blank.
 */

import { Component, type ReactNode } from 'react';
import { HeroSlider } from '../components/home/HeroSlider';

function Safe({ children }: { children: ReactNode }) {
  return (
    <SectionGuard>
      {children}
    </SectionGuard>
  );
}

class SectionGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function HomePage() {
  return (
    <div>
      <Safe>
        <HeroSlider />
      </Safe>
      <Safe>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--navy)] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At the Professor R.I.S Agbede Foundation, we are driven by a deep commitment to stand with indigent Nigerians facing the daunting challenge of end-stage kidney disease. Our mission is to ensure that no one is left to suffer simply because they cannot afford life-saving replacement therapy.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                We believe in the power of excellence and education, supporting prizes for parasitology study and building the capacity of healthcare workers to better manage kidney health. By collaborating with hospitals and providers, we bring vital awareness, prevention, and early detection programs to the heart of our communities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From providing financial assistance for critical laboratory investigations to establishing holistic patient support programs that offer counseling and nutritional guidance, we strive to be a beacon of hope and a practical source of relief for patients and their caregivers across Nigeria.
              </p>
            </div>
          </div>
        </section>
      </Safe>
      <Safe>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-[var(--navy)]">
              Our Key Programmes
            </h2>
            <div className="w-24 h-1 bg-[var(--gold)] mx-auto mb-4" />
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
              Focused interventions to reduce the burden of kidney disease across Nigeria
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3 text-left">
              <div className="bg-white rounded-xl shadow-md border p-8">
                <h3 className="text-xl font-bold text-[var(--navy)] mb-3">Kidney Care Support</h3>
                <p className="text-gray-600">Financial assistance for dialysis and replacement therapy for indigent patients.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border p-8">
                <h3 className="text-xl font-bold text-[var(--navy)] mb-3">Awareness &amp; Prevention</h3>
                <p className="text-gray-600">Community outreach, early detection and kidney health education.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md border p-8">
                <h3 className="text-xl font-bold text-[var(--navy)] mb-3">Medical Research</h3>
                <p className="text-gray-600">Prizes and grants recognising excellence in parasitology and kidney research.</p>
              </div>
            </div>
          </div>
        </section>
      </Safe>
      <Safe>
        <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1A3C5E' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Support Changes Everything
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
                A kidney patient in Nigeria is waiting. Your support today could be the difference between life and another day of suffering. Join us in providing life-saving care to those who need it most.
              </p>
              <a
                href="/donate"
                className="inline-block px-10 py-4 text-[#1A3C5E] rounded-full font-bold text-lg"
                style={{ backgroundColor: '#C8832A' }}
              >
                Support the Foundation
              </a>
            </div>
          </div>
        </section>
      </Safe>
    </div>
  );
}
