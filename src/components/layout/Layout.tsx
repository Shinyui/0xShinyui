import { ReactNode } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/next';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = '0xShinyui - 技術部落格',
  description = '分享產品管理、技術開發、運營經驗的部落格',
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--text-primary)',
        }}
      >
        <Header />

        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-grow">
          {children}
          <Analytics />
        </main>

        <Footer />
      </div>
    </>
  );
}
