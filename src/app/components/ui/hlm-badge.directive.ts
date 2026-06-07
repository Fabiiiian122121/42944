import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-slate-900 text-white shadow hover:bg-slate-800',
        secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200',
        destructive: 'border-transparent bg-red-600 text-white shadow hover:bg-red-500',
        outline: 'border-slate-200 text-slate-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
  selector: '[hlmBadge]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmBadgeDirective {
  public readonly variant = input<BadgeVariants['variant']>('default');
  public readonly userClass = input<string>('', { alias: 'class' });

  protected readonly _computedClass = computed(() =>
    cn(badgeVariants({ variant: this.variant() }), this.userClass())
  );
}