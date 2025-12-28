import { ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface InfoCardProps {
  title: string;
  content: ReactNode;
  titleColor?: 'gold' | 'primary';
  hoverEffect?: boolean;
}

export default function InfoCard({
  title,
  content,
  titleColor = 'gold',
  hoverEffect = true,
}: InfoCardProps) {
  return (
    <Card hoverable={hoverEffect} padding="lg">
      <h2
        className="text-lg font-semibold mb-3"
        style={{
          color: titleColor === 'gold' ? 'var(--accent-gold)' : 'var(--text-primary)',
        }}
      >
        {title}
      </h2>
      <div style={{ color: 'var(--text-secondary)' }}>{content}</div>
    </Card>
  );
}
