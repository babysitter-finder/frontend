'use client';

import { cn } from '@/lib/utils';

type ButtonVariant = 'blue' | 'pink' | 'yellow' | 'red' | 'green' | 'highlight';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  blue: 'bg-illustration-secondary',
  pink: 'bg-illustration-primary',
  yellow: 'bg-warning',
  red: 'bg-negative',
  green: 'bg-positive',
  highlight: 'bg-black text-elements',
};

export function Button({
  variant = 'blue',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-block px-[var(--spacing-medium)] py-[var(--spacing-micro)]',
        'rounded-[var(--radius-button)] border-none',
        'text-black font-roboto text-lg cursor-pointer',
        'no-underline outline-none transition-opacity hover:opacity-90',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
