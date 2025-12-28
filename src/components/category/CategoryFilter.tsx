import CategoryTag from './CategoryTag';

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
  showAllButton?: boolean;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  showAllButton = true,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {showAllButton && (
        <CategoryTag
          category="all"
          isActive={!activeCategory}
          href="/"
        />
      )}
      {categories.map((category) => (
        <CategoryTag
          key={category}
          category={category}
          isActive={category === activeCategory}
        />
      ))}
    </div>
  );
}
