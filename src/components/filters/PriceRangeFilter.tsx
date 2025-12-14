"use client";

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({ min, max, value, onChange }: PriceRangeFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: number[]) => {
    const range: [number, number] = [newValue[0], newValue[1]];
    setLocalValue(range);
    onChange(range);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Price Range</span>
        <span className="text-sm text-gray-600">
          ${localValue[0]} - ${localValue[1]}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={localValue}
        onValueChange={handleChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}
