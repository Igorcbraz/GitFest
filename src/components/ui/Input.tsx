import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'w-full px-4 py-2 border rounded-lg font-normal transition-all duration-base placeholder:text-text-muted focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'border-border bg-background-surface text-text-primary focus:border-primary-500 focus:ring-primary-500/20',
        filled:
          'border-transparent bg-background-muted text-text-primary focus:bg-background-surface focus:border-primary-500 focus:ring-primary-500/20',
        outlined:
          'border-2 border-border bg-transparent text-text-primary focus:border-primary-500 focus:ring-primary-500/20',
        error:
          'border-state-error bg-background-surface text-text-primary focus:border-state-error focus:ring-state-error/20',
        success:
          'border-state-success bg-background-surface text-text-primary focus:border-state-success focus:ring-state-success/20',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 min-h-[32px]',
        md: 'text-base px-4 py-2 min-h-[40px]',
        lg: 'text-lg px-5 py-3 min-h-[48px]',
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
      variant: 'default',
      size: 'md',
      rounded: 'lg',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      type = 'text',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputVariant = error ? 'error' : variant

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName || ''}`}>
        {/*Label */}
        {label && (
          <label
            htmlFor={props.id}
            className='text-sm font-medium text-text-primary'
          >
            {label}
            {props.required && <span className='text-state-error ml-1'>*</span>}
          </label>
        )}

        {/*Container do input com ícones */}
        <div className='relative'>
          {/*Ícone esquerdo */}
          {leftIcon && (
            <div className='absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none'>
              {leftIcon}
            </div>
          )}

          {/*Input */}
          <input
            type={type}
            className={inputVariants({
              variant: inputVariant,
              size,
              rounded,
              className: `${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className || ''}`,
            })}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />

          {/*Ícone direito */}
          {rightIcon && (
            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none'>
              {rightIcon}
            </div>
          )}
        </div>

        {/*Mensagem de erro */}
        {error && (
          <p
            id={`${props.id}-error`}
            className='text-sm text-state-error flex items-center gap-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-4 h-4'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </p>
        )}

        {/*Texto auxiliar */}
        {helperText && !error && (
          <p
            id={`${props.id}-helper`}
            className='text-sm text-text-secondary'
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

const textareaVariants = cva(
  'w-full px-4 py-2 border rounded-lg font-normal transition-all duration-base placeholder:text-text-muted focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed resize-y',
  {
    variants: {
      variant: {
        default:
          'border-border bg-background-surface text-text-primary focus:border-primary-500 focus:ring-primary-500/20',
        filled:
          'border-transparent bg-background-muted text-text-primary focus:bg-background-surface focus:border-primary-500 focus:ring-primary-500/20',
        outlined:
          'border-2 border-border bg-transparent text-text-primary focus:border-primary-500 focus:ring-primary-500/20',
        error:
          'border-state-error bg-background-surface text-text-primary focus:border-state-error focus:ring-state-error/20',
      },
      size: {
        sm: 'text-sm px-3 py-1.5 min-h-[80px]',
        md: 'text-base px-4 py-2 min-h-[120px]',
        lg: 'text-lg px-5 py-3 min-h-[160px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      error,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaVariant = error ? 'error' : variant

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName || ''}`}>
        {label && (
          <label
            htmlFor={props.id}
            className='text-sm font-medium text-text-primary'
          >
            {label}
            {props.required && <span className='text-state-error ml-1'>*</span>}
          </label>
        )}

        <textarea
          className={textareaVariants({
            variant: textareaVariant,
            size,
            className,
          })}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <p
            id={`${props.id}-error`}
            className='text-sm text-state-error flex items-center gap-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              className='w-4 h-4'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${props.id}-helper`}
            className='text-sm text-text-secondary'
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, inputVariants, Textarea, textareaVariants }
