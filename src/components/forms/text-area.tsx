'use client';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  const textAreaId = id || props.name;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textAreaId}
          className="text-black font-roboto text-lg font-medium"
        >
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className={cn(
          'w-full px-4 py-3 rounded-[var(--radius-card)]',
          'border border-black bg-section',
          'font-roboto text-black text-base',
          'outline-none focus:ring-2 focus:ring-illustration-secondary',
          'placeholder:text-gray-400 resize-none min-h-[120px]',
          error && 'border-negative',
          className
        )}
        {...props}
      />
      {error && <span className="text-negative text-sm">{error}</span>}
    </div>
  );
}
