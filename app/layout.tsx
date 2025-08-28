
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Atucha Tour',
  description: 'Interactive tours with scalable fidelity'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
