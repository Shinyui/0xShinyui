interface TocItem {
  slug: string;
  content: string;
  lvl: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  variant?: 'desktop' | 'mobile';
}

export default function TableOfContents({
  items,
  variant = 'desktop',
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  const isMobile = variant === 'mobile';

  return (
    <nav
      className={`
        ${isMobile ? 'block md:hidden mb-6' : 'sticky top-6 self-start pr-4 hidden md:block'}
        text-sm p-4 rounded-lg border
      `}
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-background)',
        boxShadow: '0 4px 6px var(--shadow-color)',
      }}
    >
      <strong
        className={`block mb-${isMobile ? '2' : '4'} text-${isMobile ? 'base' : 'lg'} font-semibold`}
        style={{ color: 'var(--accent-gold)' }}
      >
        目錄
      </strong>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className={`
                ${isMobile ? '' : 'text-base'}
                block transition-colors duration-300
                ${item.lvl === 2 ? '' : ''}
                ${item.lvl === 3 ? 'pl-4' : ''}
                ${item.lvl === 4 ? 'pl-6' : ''}
                ${item.lvl === 5 ? 'pl-8' : ''}
                ${item.lvl === 6 ? 'pl-10' : ''}
              `}
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
