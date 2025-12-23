'use client';

import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export function Select({ label, options, error, className, id, ...props }: SelectProps) {
  const selectId = id || props.name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={selectId}
          className="text-black font-roboto text-lg font-medium"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-3 rounded-[var(--radius-card)]',
          'border border-black bg-section',
          'font-roboto text-black text-base',
          'outline-none focus:ring-2 focus:ring-illustration-secondary',
          'cursor-pointer',
          error && 'border-negative',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-negative text-sm">{error}</span>}
    </div>
  );
}
