import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello CareIndeed',
  description: 'Lorep Ipsum Dolor Sit Amet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full bg-gray-50 text-base antialiased'>
      <body className='flex flex-col min-h-screen'>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
