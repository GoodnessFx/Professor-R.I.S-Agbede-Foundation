import { RouterProvider } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<div style={{ padding: 40, fontFamily: 'sans-serif' }}>Loading…</div>} />
      <Toaster richColors position="top-right" />
    </>
  );
}