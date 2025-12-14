"use client";

import { Checkbox } from '@/components/ui/checkbox';

interface ConditionFilterProps {
  selectedConditions: ('new' | 'used' | 'refurbished')[];
  onChange: (conditions: ('new' | 'used' | 'refurbished')[]) => void;
}

const conditions = [
  { value: 'new' as const, label: 'New' },
  { value: 'used' as const, label: 'Used' },
  { value: 'refurbished' as const, label: 'Refurbished' }
];

export function ConditionFilter({ selectedConditions, onChange }: ConditionFilterProps) {
  const handleToggle = (condition: 'new' | 'used' | 'refurbished') => {
    if (selectedConditions.includes(condition)) {
      onChange(selectedConditions.filter(c => c !== condition));
    } else {
      onChange([...selectedConditions, condition]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Condition</h3>
      <div className="space-y-2">
        {conditions.map((condition) => (
          <div key={condition.value} className="flex items-center space-x-2">
            <Checkbox
              id={`condition-${condition.value}`}
              checked={selectedConditions.includes(condition.value)}
              onCheckedChange={() => handleToggle(condition.value)}
            />
            <label
              htmlFor={`condition-${condition.value}`}
              className="text-sm cursor-pointer"
            >
              {condition.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
