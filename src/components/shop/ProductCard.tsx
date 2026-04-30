import { useState } from 'react';
import { Product, TELEGRAM_URL } from '@/lib/shopConfig';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { title, description, price, icon, color, features } = product;

  return (
    <div
      className="group relative overflow-hidden rounded-xl transition-all duration-300 flex flex-col"
      style={{
        backgroundColor: 'var(--card-background)',
        border: `1px solid var(--border-color)`,
        boxShadow: isHovered
          ? `0 20px 40px -12px ${color}30`
          : '0 2px 8px rgba(0, 0, 0, 0.15)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top color block with icon — product image area */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}25, ${color}08)`,
        }}
      >
        <span
          className="text-6xl transition-transform duration-500 group-hover:scale-110"
          role="img"
        >
          {icon}
        </span>
        {/* Subtle diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              ${color} 10px,
              ${color} 11px
            )`,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3
          className="text-lg font-bold mb-2 line-clamp-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>

        {/* Description — max 2 lines */}
        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${color}12`,
                color: color,
                border: `1px solid ${color}25`,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Spacer to push bottom section down */}
        <div className="flex-grow" />

        {/* Separator */}
        <div
          className="my-3 h-px"
          style={{ backgroundColor: 'var(--border-color)' }}
        />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span
            className="text-lg font-bold"
            style={{ color }}
          >
            {price}
          </span>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 inline-flex items-center gap-1.5"
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: '#0b0e11',
            }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            聯繫購買
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
