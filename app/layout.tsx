import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sanjeevani - AI Elder Care & Accessibility Companion',
  description: 'AI-Powered Elder Care with Voice Guidance, Drug Safety Shield, and Fall Detection.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Sanjeevani - AI Elder Care & Accessibility Companion',
    description: 'AI-Powered Elder Care with Voice Guidance, Drug Safety Shield, and Zero-Hardware Fall Detection.',
    url: 'https://sanjeevani-web-ashy.vercel.app',
    siteName: 'Sanjeevani',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}