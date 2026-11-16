import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Bilişim Lab 5 — MEB 5. Sınıf Bilişim Teknolojileri Öğrenme Atölyesi',
  description:
    'MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım müfredatına uygun 5 ünite, konu özetleri, 3D kavram kartları, etkileşimli testler ve AI Bilişim Rehberi.',
  openGraph: {
    title: 'Bilişim Lab 5 — MEB 5. Sınıf Bilişim Teknolojileri Öğrenme Atölyesi',
    description:
      'MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım müfredatına uygun 5 ünite, konu özetleri, 3D kavram kartları, etkileşimli testler ve AI Bilişim Rehberi.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bilişim Lab 5 — MEB 5. Sınıf Bilişim Teknolojileri Öğrenme Atölyesi',
    description:
      'MEB 5. Sınıf Bilişim Teknolojileri ve Yazılım müfredatına uygun 5 ünite, konu özetleri, 3D kavram kartları, etkileşimli testler ve AI Bilişim Rehberi.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${plusJakarta.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900"
      >
        {children}
      </body>
    </html>
  );
}
