'use client';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-black font-roboto text-lg font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-[var(--radius-card)]',
          'border border-black bg-section',
          'font-roboto text-black text-base',
          'outline-none focus:ring-2 focus:ring-illustration-secondary',
          'placeholder:text-gray-400',
          error && 'border-negative',
          className
        )}
        {...props}
      />
      {error && <span className="text-negative text-sm">{error}</span>}
    </div>
  );
}
