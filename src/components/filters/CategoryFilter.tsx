"use client";

import { Category } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: number[];
  onChange: (categoryIds: number[]) => void;
}

export function CategoryFilter({ categories, selectedCategories, onChange }: CategoryFilterProps) {
  const handleToggle = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      onChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => handleToggle(category.id)}
            />
            <label
              htmlFor={`category-${category.id}`}
              className="text-sm cursor-pointer flex-1"
            >
              {category.name}
              {category.productCount && (
                <span className="text-gray-500 ml-1">({category.productCount})</span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
