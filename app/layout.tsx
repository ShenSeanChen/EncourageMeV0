// app/layout.tsx
// Root layout component for the application

import './globals.css';
import { Inter } from 'next/font/google';
import { ApiKeyProvider } from '@/lib/contexts/ApiKeyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Next.js App',
  description: 'Created with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApiKeyProvider>
          {children}
        </ApiKeyProvider>
      </body>
    </html>
  );
}