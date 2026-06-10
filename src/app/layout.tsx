import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// Optimized font loading via next/font (self-hosted, no external requests)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abhijeetpachpute.com';

export const metadata: Metadata = {
  title: 'Abhijeet Sandip Pachpute · AI Engineer',
  description:
    'AI engineer building production LLM systems: RAG, agents, evals. MS CS, University of Utah (2026). 2 IEEE publications, 3 patents.',
  keywords: [
    'Abhijeet Pachpute',
    'Abhijeet Sandip Pachpute',
    'AI Engineer',
    'ML Engineer',
    'Machine Learning',
    'LLM',
    'RAG',
    'Agents',
    'Software Engineer',
    'Full Stack Developer',
    'University of Utah',
    'Computer Science',
    'Python',
    'TypeScript',
  ],
  authors: [{ name: 'Abhijeet Sandip Pachpute' }],
  creator: 'Abhijeet Sandip Pachpute',
  publisher: 'Abhijeet Sandip Pachpute',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Abhijeet Sandip Pachpute · AI Engineer',
    description:
      'AI engineer building production LLM systems: RAG, agents, evals. MS CS, University of Utah (2026). 2 IEEE publications, 3 patents.',
    siteName: 'Abhijeet Sandip Pachpute',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Abhijeet Sandip Pachpute · AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhijeet Sandip Pachpute · AI Engineer',
    description:
      'AI engineer building production LLM systems: RAG, agents, evals. MS CS, University of Utah (2026).',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abhijeet Sandip Pachpute',
    alternateName: 'Abhi',
    jobTitle: 'AI Engineer | Software Engineer',
    url: siteUrl,
    sameAs: [
      'https://linkedin.com/in/abhijeet-pachpute/',
      'https://github.com/AbhijeetP21',
      'https://scholar.google.com/citations?user=1aG6rS8AAAAJ',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Utah',
    },
    email: 'abhijeetsp21@gmail.com',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'LLM Applications',
      'Retrieval-Augmented Generation',
      'Software Engineering',
      'Full Stack Development',
      'Cybersecurity',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Favicon - real files for Google indexing */}
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className="bg-[#fafaf9] text-zinc-900 dark:bg-[#0a0a0c] dark:text-zinc-300 selection:bg-emerald-500/25 antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
