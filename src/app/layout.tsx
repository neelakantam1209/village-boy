import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart';
import { LocationProvider } from '@/hooks/use-location';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Local Boy',
  description: 'Your one-stop solution for home services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        <LocationProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LocationProvider>
        <Toaster />
      </body>
    </html>
  );
}
