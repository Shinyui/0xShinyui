import Link from 'next/link';
import PostCover from './PostCover';
import PostMeta from './PostMeta';

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    contentType: string;
    coverImage?: {
      url: string;
    } | null;
  };
  showCover?: boolean;
  showExcerpt?: boolean;
}

export default function PostCard({
  post,
  showCover = true,
  showExcerpt = true,
}: PostCardProps) {
  return (
    <div
      className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 border hover:scale-105"
      style={{
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--border-color)',
        boxShadow: '0 4px 6px var(--shadow-color)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-gold)';
        e.currentTarget.style.boxShadow = '0 8px 25px var(--shadow-color)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = '0 4px 6px var(--shadow-color)';
      }}
    >
      {showCover && post.coverImage?.url && (
        <Link href={`/posts/${post.slug}`} className="block">
          <PostCover
            src={post.coverImage.url}
            alt={post.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
      )}

      <PostMeta date={post.date} category={post.contentType} />

      <Link href={`/posts/${post.slug}`} className="block">
        <h2
          className="text-lg font-semibold mb-1 transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-gold)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          {post.title}
        </h2>
      </Link>

      {showExcerpt && (
        <p
          className="text-sm line-clamp-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {post.excerpt}
        </p>
      )}
    </div>
  );
}
