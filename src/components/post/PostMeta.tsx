import { getCategoryDisplayName } from '@/utils/category';

interface PostMetaProps {
  date: string;
  category: string;
  dateVariant?: 'default' | 'muted';
}

export default function PostMeta({
  date,
  category,
  dateVariant = 'muted',
}: PostMetaProps) {
  return (
    <>
      <p
        className="inline-block mb-1 py-[4px] px-[8px] rounded text-[12px] font-medium"
        style={{
          backgroundColor: 'var(--accent-gold)',
          color: 'var(--background)',
          opacity: 0.9,
        }}
      >
        {getCategoryDisplayName(category)}
      </p>
      <p
        className="text-xs mb-2"
        style={{
          color: dateVariant === 'muted' ? 'var(--text-muted)' : 'var(--text-secondary)',
        }}
      >
        {date}
      </p>
    </>
  );
}
