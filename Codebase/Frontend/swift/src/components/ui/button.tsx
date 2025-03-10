import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50',
          {
            'default': 'bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90',
            'outline': 'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900',
            'ghost': 'hover:bg-gray-100 hover:text-gray-900',
          }[variant],
          {
            'default': 'h-9 px-4 py-2',
            'sm': 'h-8 rounded-md px-3 text-xs',
            'lg': 'h-10 rounded-md px-8',
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };