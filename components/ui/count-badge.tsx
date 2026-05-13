import { cn } from '@/lib/utils';

type CountBadgeVariant = 'blue' | 'amber' | 'green' | 'red';

interface CountBadgeProps {
  count: number;
  variant?: CountBadgeVariant;
  className?: string;
}

const variantStyles: Record<CountBadgeVariant, string> = {
  blue: 'bg-blue-600 text-white',
  amber: 'bg-amber-500 text-white',
  green: 'bg-emerald-600 text-white',
  red: 'bg-red-600 text-white',
};

/**
 * Reusable count badge — small pill showing a numeric count.
 * Used in sidebar nav items, table headers, tabs, etc.
 */
export default function CountBadge({
  count,
  variant = 'blue',
  className,
}: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full px-1.5 text-[10px] font-semibold leading-none',
        variantStyles[variant],
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
