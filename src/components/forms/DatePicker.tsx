'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: Date;
  label?: string;
  error?: string;
  className?: string;
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateToISO(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseISODate(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month: month - 1, day };
}

export function DatePicker({
  value,
  onChange,
  minDate = new Date(),
  label,
  error,
  className,
}: DatePickerProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const selectedDate = useMemo(() => parseISODate(value), [value]);

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days: (number | null)[] = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [viewYear, viewMonth]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(viewYear, viewMonth, day);
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    return date < min;
  };

  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.year === viewYear &&
      selectedDate.month === viewMonth &&
      selectedDate.day === day
    );
  };

  const isToday = (day: number): boolean => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const handleDayClick = (day: number) => {
    if (!isDateDisabled(day)) {
      onChange(formatDateToISO(viewYear, viewMonth, day));
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-black font-roboto text-lg font-medium">
          {label}
        </label>
      )}

      <div
        className={cn(
          'bg-section border rounded-[var(--radius-card)] p-4',
          error ? 'border-negative' : 'border-black'
        )}
      >
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h3 className="font-overlock text-lg font-bold text-black">
            {MONTHS[viewMonth]} {viewYear}
          </h3>

          <button
            type="button"
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day !== null && (
                <button
                  type="button"
                  onClick={() => handleDayClick(day)}
                  disabled={isDateDisabled(day)}
                  className={cn(
                    'w-full h-full flex items-center justify-center rounded-[var(--radius-button)] text-sm transition-colors',
                    isSelected(day)
                      ? 'bg-illustration-primary text-white font-bold'
                      : isToday(day)
                      ? 'ring-2 ring-illustration-secondary text-black'
                      : 'text-black hover:bg-illustration-secondary/20',
                    isDateDisabled(day) && 'text-gray-300 cursor-not-allowed hover:bg-transparent'
                  )}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && <span className="text-negative text-sm">{error}</span>}
    </div>
  );
}
