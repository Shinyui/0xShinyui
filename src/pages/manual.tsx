import Head from 'next/head';
import SEO from '@/components/seo/SEO';
import { WebSiteJsonLd } from '@/components/seo/JsonLd';
import { Analytics } from '@vercel/analytics/next';
import ClassifiedDocument from '@/components/manual/ClassifiedDocument';

export default function ManualPage() {
  return (
    <>
      <SEO
        title="個人操作手冊 - 0xShinyui"
        description="0xNull 系統個人操作手冊 — 關於思考、工作與生活的核心原則"
        canonical="/manual"
      />
      <WebSiteJsonLd />
      <Head>
        <style>{`body { background-color: #f4e4c1 !important; }`}</style>
      </Head>
      <div style={{ minHeight: '100vh' }}>
        <ClassifiedDocument />
      </div>
      <Analytics />
    </>
  );
}
