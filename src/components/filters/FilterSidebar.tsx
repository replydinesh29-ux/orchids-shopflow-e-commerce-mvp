"use client";

import { FilterOptions, Category, Brand } from '@/lib/types';
import { PriceRangeFilter } from './PriceRangeFilter';
import { CategoryFilter } from './CategoryFilter';
import { BrandFilter } from './BrandFilter';
import { RatingFilter } from './RatingFilter';
import { ConditionFilter } from './ConditionFilter';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface FilterSidebarProps {
  filters: FilterOptions;
  categories?: Category[];
  brands?: Brand[];
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({ 
  filters, 
  categories = [], 
  brands = [], 
  onFiltersChange,
  onClearFilters 
}: FilterSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 space-y-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear all
        </Button>
      </div>

      <div className="space-y-6 divide-y">
        {categories.length > 0 && (
          <div className="pt-4 first:pt-0">
            <CategoryFilter
              categories={categories}
              selectedCategories={filters.categories || []}
              onChange={(categories) => onFiltersChange({ ...filters, categories })}
            />
          </div>
        )}

        <div className="pt-4">
          <PriceRangeFilter
            min={0}
            max={10000}
            value={[filters.minPrice || 0, filters.maxPrice || 10000]}
            onChange={([minPrice, maxPrice]) => onFiltersChange({ ...filters, minPrice, maxPrice })}
          />
        </div>

        {brands.length > 0 && (
          <div className="pt-4">
            <BrandFilter
              brands={brands}
              selectedBrands={filters.brands || []}
              onChange={(brands) => onFiltersChange({ ...filters, brands })}
            />
          </div>
        )}

        <div className="pt-4">
          <RatingFilter
            selectedRating={filters.minRating || null}
            onChange={(minRating) => onFiltersChange({ ...filters, minRating: minRating || undefined })}
          />
        </div>

        <div className="pt-4">
          <ConditionFilter
            selectedConditions={filters.condition || []}
            onChange={(condition) => onFiltersChange({ ...filters, condition })}
          />
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="text-sm font-medium">Shipping</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free-shipping"
              checked={filters.freeShipping || false}
              onCheckedChange={(checked) => onFiltersChange({ ...filters, freeShipping: checked as boolean })}
            />
            <label htmlFor="free-shipping" className="text-sm cursor-pointer">
              Free Shipping
            </label>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="text-sm font-medium">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock || false}
              onCheckedChange={(checked) => onFiltersChange({ ...filters, inStock: checked as boolean })}
            />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
