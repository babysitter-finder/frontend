import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Hi Sitter - Encuentra tu ninera ideal',
  description: 'Plataforma para conectar familias con nineras de confianza',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
