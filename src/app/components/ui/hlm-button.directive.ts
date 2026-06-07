import { Directive, computed, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white shadow hover:bg-slate-800',
        destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-500',
        outline: 'border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900',
        secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'text-slate-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmButtonDirective {
  public readonly variant = input<ButtonVariants['variant']>('default');
  public readonly size = input<ButtonVariants['size']>('default');
  public readonly userClass = input<string>('', { alias: 'class' });

  protected readonly _computedClass = computed(() =>
    cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.userClass())
  );
}