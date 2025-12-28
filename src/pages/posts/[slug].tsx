import { getPostBySlug, getPostSlugs } from '@/lib/hygraph';
import Layout from '@/components/layout/Layout';
import TableOfContents from '@/components/post/TableOfContents';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import toc from 'markdown-toc';
import type { GetStaticPaths, GetStaticProps } from 'next';

type TocItem = { slug: string; content: string; lvl: number };

type PostProps = {
  post: {
    title: string;
    date: string;
    excerpt: string;
    contentHtml: string;
    toc: TocItem[];
    coverImage: string | null;
  };
};

export default function Post({ post }: PostProps) {
  return (
    <Layout title={`${post.title} - 0xShinyui`} description={post.excerpt}>
      {/* 封面 + 基本資料 */}
      <div className="mx-auto mb-12">
        {post.coverImage && (
          <div
            className="w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden shadow-lg border"
            style={{
              borderColor: 'var(--border-color)',
              boxShadow: '0 8px 25px var(--shadow-color)',
            }}
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {post.title}
        </h1>
        <p className="text-base mb-4" style={{ color: 'var(--text-muted)' }}>
          {post.date}
        </p>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          {post.excerpt}
        </p>
      </div>

      {/* 排版主體區塊：手機單欄，桌機兩欄 */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
        {/* 桌機版目錄（sticky 側欄） */}
        <TableOfContents items={post.toc} variant="desktop" />

        {/* 右側文章區（含手機版目錄） */}
        <div>
          {/* 手機版目錄（出現在文章上方） */}
          <TableOfContents items={post.toc} variant="mobile" />

          {/* 正文內容 */}
          <article
            className="
              prose max-w-none p-6 rounded-lg border
              [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
              [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
              [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2
              [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-1
              [&_h5]:text-lg [&_h5]:font-medium [&_h5]:mt-4 [&_h5]:mb-1
              [&_h6]:text-base [&_h6]:font-medium [&_h6]:mt-3 [&_h6]:mb-1

              [&_h1]:text-[var(--text-primary)]
              [&_h2]:text-[var(--text-primary)]
              [&_h3]:text-[var(--text-primary)]
              [&_h4]:text-[var(--text-primary)]
              [&_h5]:text-[var(--text-primary)]
              [&_h6]:text-[var(--text-primary)]

              [&_p]:text-base [&_p]:mb-4 [&_p]:leading-relaxed
              [&_a]:transition-colors [&_a]:duration-300
              [&_a]:text-[var(--accent-gold)]
              [&_a:hover]:text-[var(--accent-gold-dark)]
              [&_strong]:font-semibold [&_strong]:text-[var(--text-primary)]
              [&_em]:italic
              [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:py-2
              [&_blockquote]:italic [&_blockquote]:my-6
              [&_blockquote]:border-[var(--accent-gold)]
              [&_blockquote]:bg-[var(--hover-background)]
              [&_blockquote_p]:mb-0
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
              [&_li]:mb-1
              [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
              [&_code]:font-mono [&_code]:text-[var(--accent-gold)]
              [&_pre]:rounded [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6
              [&_pre]:bg-[#000000] [&_pre]:text-[var(--text-primary)]
              [&_table]:table-auto [&_table]:border [&_table]:text-sm [&_table]:my-6
              [&_table]:border-[var(--border-color)]
              [&_thead]:font-semibold [&_thead]:bg-[var(--hover-background)]
              [&_th]:border [&_th]:px-3 [&_th]:py-2
              [&_th]:border-[var(--border-color)]
              [&_th]:text-[var(--text-primary)]
              [&_td]:border [&_td]:px-3 [&_td]:py-2
              [&_td]:border-[var(--border-color)]
              [&_hr]:my-10 [&_hr]:border-t [&_hr]:border-[var(--border-color)]
              [&_img]:rounded [&_img]:shadow-md [&_img]:my-4
              hover:[&_img]:scale-105 transition-transform duration-300 ease-in-out

              [id]:target:before:content-[''] [id]:target:before:block
              [id]:target:before:h-20 [id]:target:before:-mt-20
            "
            style={{
              backgroundColor: 'var(--card-background)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              boxShadow: '0 4px 6px var(--shadow-color)',
            }}
            dangerouslySetInnerHTML={{
              __html: post.contentHtml,
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPostSlugs();
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const postData = await getPostBySlug(params!.slug as string);

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypeStringify)
      .process(postData.content);

    const tocData = toc(postData.content).json as TocItem[];

    return {
      props: {
        post: {
          title: postData.title,
          date: postData.date,
          excerpt: postData.excerpt,
          contentHtml: processed.toString(),
          coverImage: postData.coverImage,
          toc: tocData,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
