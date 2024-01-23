import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitch Clone',
  description: 'Live Stream your gameplay with us.',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <body className={cn('h-full', inter.className)}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorBackground: 'hsl(224 71.4% 4.1%)',
              colorText: 'hsl(210 20% 98%)',
              colorPrimary: 'hsl(263.4 70% 50.4%)',
              colorInputBackground: 'transparent',
            },
          }}
        >
          <Toaster theme='light' position='top-center' />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
