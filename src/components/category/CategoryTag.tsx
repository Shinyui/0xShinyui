import Link from 'next/link';
import { getCategoryDisplayName } from '@/utils/category';

interface CategoryTagProps {
  category: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

export default function CategoryTag({
  category,
  isActive = false,
  onClick,
  href,
}: CategoryTagProps) {
  const displayName = getCategoryDisplayName(category);

  const className =
    'inline-block px-3 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105';

  const style = {
    backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--card-background)',
    borderColor: 'var(--accent-gold)',
    color: isActive ? 'var(--background)' : 'var(--accent-gold)',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
      e.currentTarget.style.color = 'var(--background)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!isActive) {
      e.currentTarget.style.backgroundColor = 'var(--card-background)';
      e.currentTarget.style.color = 'var(--accent-gold)';
    }
  };

  // 如果提供了 onClick，渲染為 button
  if (onClick) {
    return (
      <button
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {displayName}
      </button>
    );
  }

  // 否則渲染為 Link
  const linkHref = href || `/category/${encodeURIComponent(category)}`;

  return (
    <Link
      href={linkHref}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayName}
    </Link>
  );
}
