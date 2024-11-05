'use client';
import { useState } from 'react';
import { Category } from '@/constants/data';
import { CellAction } from '@/app/dashboard/catalog/categories/_components/categories-tables/cell-action';

interface CategoryTreeProps {
  category: Category;
  onSelectCategory: (category: Category) => void;
  activeCategory: Category | null; // Make sure this is required in the props
}

const CategoryTree: React.FC<CategoryTreeProps> = ({
  category,
  onSelectCategory,
  activeCategory
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents triggering on the category name click
    setIsExpanded(!isExpanded);
  };

  const isActive = activeCategory?.id === category.id;

  return (
    <div className="mb-2 ml-4">
      <div
        onClick={() => onSelectCategory(category)}
        className={`flex cursor-pointer items-center space-x-2 font-semibold text-gray-800 ${
          isActive ? 'rounded-md bg-orange-500 p-2 text-white' : ''
        }`}
      >
        <span onClick={toggleExpand} className="cursor-pointer">
          {isExpanded ? '-' : '+'}
        </span>
        <span>
          {category.name} (ID: {category.id})
        </span>
        <CellAction data={category} />
      </div>

      {isExpanded && (
        <div className="ml-6">
          {category.subcategories?.map((subcat) => (
            <CategoryTree
              key={subcat.id}
              category={subcat}
              onSelectCategory={onSelectCategory}
              activeCategory={activeCategory} // Pass the activeCategory prop
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTree;
