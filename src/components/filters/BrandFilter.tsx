"use client";

import { Brand } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

interface BrandFilterProps {
  brands: Brand[];
  selectedBrands: number[];
  onChange: (brandIds: number[]) => void;
}

export function BrandFilter({ brands, selectedBrands, onChange }: BrandFilterProps) {
  const handleToggle = (brandId: number) => {
    if (selectedBrands.includes(brandId)) {
      onChange(selectedBrands.filter(id => id !== brandId));
    } else {
      onChange([...selectedBrands, brandId]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Brands</h3>
      <div className="space-y-2">
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand.id}`}
              checked={selectedBrands.includes(brand.id)}
              onCheckedChange={() => handleToggle(brand.id)}
            />
            <label
              htmlFor={`brand-${brand.id}`}
              className="text-sm cursor-pointer flex-1"
            >
              {brand.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
