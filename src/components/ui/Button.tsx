import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Definição das variantes do botão usando CVA
const buttonVariants = cva(
  // Classes base para todos os botões
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-base focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Botão preenchido primário (roxo)
        primary:
          'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg',

        // Botão preenchido secundário (laranja)
        secondary:
          'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary-500 shadow-md hover:shadow-lg',

        // Botão com contorno primário
        outline:
          'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',

        // Botão com contorno secundário
        'outline-secondary':
          'border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 focus:ring-secondary-500',

        // Botão fantasma (sem fundo)
        ghost:
          'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',

        // Botão de link
        link:
          'text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500',

        // Botão de sucesso
        success:
          'bg-state-success text-white hover:bg-state-success-dark active:bg-state-success-dark focus:ring-state-success shadow-md hover:shadow-lg',

        // Botão de erro/perigo
        danger:
          'bg-state-error text-white hover:bg-state-error-dark active:bg-state-error-dark focus:ring-state-error shadow-md hover:shadow-lg',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 min-h-[32px]',
        md: 'text-base px-4 py-2 min-h-[40px]',
        lg: 'text-lg px-6 py-3 min-h-[48px]',
        xl: 'text-xl px-8 py-4 min-h-[56px]',
        icon: 'p-2 min-h-[40px] min-w-[40px]',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'lg',
    },
  }
);

// Interface das props do botão
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

// Componente Button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      children,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={buttonVariants({ variant, size, rounded, className })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
