import Image from 'next/image';

interface PostCoverProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
}

export default function PostCover({
  src,
  alt,
  aspectRatio = '16/9',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
}: PostCoverProps) {
  return (
    <div
      className="relative w-full h-48 mb-3 rounded overflow-hidden border"
      style={{
        borderColor: 'var(--border-color)',
        aspectRatio
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-110"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
