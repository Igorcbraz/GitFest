import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Definição das variantes do card usando CVA
const cardVariants = cva(
  // Classes base para todos os cards
  'rounded-xl transition-all duration-base',
  {
    variants: {
      variant: {
        default:
          'bg-background-surface border border-border shadow-md',
        elevated:
          'bg-background-surface shadow-lg hover:shadow-xl',
        outlined:
          'bg-transparent border-2 border-border',
        ghost:
          'bg-transparent',
        gradient:
          'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1',
        glow: 'hover:shadow-glow-primary',
        scale: 'hover:scale-105',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
    },
  }
);

// Interface das props do card
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

// Componente Card principal
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, padding, hover, className })}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

// Componente CardHeader
const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      border: {
        none: '',
        bottom: 'border-b border-border',
      },
    },
    defaultVariants: {
      padding: 'md',
      border: 'none',
    },
  }
);

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding, border, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardHeaderVariants({ padding, border, className })}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

// Componente CardTitle
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight text-text-primary ${className || ''}`}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

// Componente CardDescription
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-text-secondary ${className || ''}`}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// Componente CardContent
const cardContentVariants = cva(
  '',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-0',
        md: 'p-6 pt-0',
        lg: 'p-8 pt-0',
      },
    },
    defaultVariants: {
      padding: 'md',
    },
  }
);

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardContentVariants({ padding, className })}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

// Componente CardFooter
const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-4 pt-0',
        md: 'p-6 pt-0',
        lg: 'p-8 pt-0',
      },
      border: {
        none: '',
        top: 'border-t border-border pt-6',
      },
    },
    defaultVariants: {
      padding: 'md',
      border: 'none',
    },
  }
);

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding, border, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardFooterVariants({ padding, border, className })}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

// Componente CardImage - para imagens dentro de cards
const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    position?: 'top' | 'bottom';
  }
>(({ className, position = 'top', ...props }, ref) => (
  <img
    ref={ref}
    className={`w-full object-cover ${
      position === 'top' ? 'rounded-t-xl' : 'rounded-b-xl'
    } ${className || ''}`}
    {...props}
  />
));
CardImage.displayName = 'CardImage';

// Card com ícone - variante específica
export interface IconCardProps extends CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

const IconCard = React.forwardRef<HTMLDivElement, IconCardProps>(
  ({ icon, title, description, iconColor = 'primary', className, ...props }, ref) => {
    const iconColorClasses = {
      primary: 'bg-primary-100 text-primary-600',
      secondary: 'bg-secondary-100 text-secondary-600',
      success: 'bg-state-success-light text-state-success-dark',
      error: 'bg-state-error-light text-state-error-dark',
      info: 'bg-state-info-light text-state-info-dark',
      warning: 'bg-state-warning-light text-state-warning-dark',
    };

    return (
      <Card ref={ref} variant="elevated" hover="lift" className={className} {...props}>
        <CardHeader>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColorClasses[iconColor]}`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    );
  }
);
IconCard.displayName = 'IconCard';

// Card de estatísticas - variante específica
export interface StatCardProps extends CardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, change, changeType = 'neutral', icon, className, ...props }, ref) => {
    const changeColors = {
      increase: 'text-state-success',
      decrease: 'text-state-error',
      neutral: 'text-text-secondary',
    };

    return (
      <Card ref={ref} variant="elevated" className={className} {...props}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-text-secondary mb-1">{label}</p>
              <p className="text-3xl font-bold text-text-primary">{value}</p>
              {change && (
                <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
                  {change}
                </p>
              )}
            </div>
            {icon && (
              <div className="p-3 bg-primary-100 text-primary-600 rounded-lg">
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
StatCard.displayName = 'StatCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  IconCard,
  StatCard,
  cardVariants,
};
