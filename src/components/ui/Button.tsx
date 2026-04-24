import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'outline'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children: ReactNode
}

// Sizes for Primary & Secondary — 

const sizeClasses: Record<ButtonSize, string> = {
  xs:    'h-7        p-3       gap-2 rounded-lg text-xs     font-medium',
  sm:    'h-8        py-3 px-4 gap-2 rounded-xl text-sm     font-medium',
  md:    'py-4 px-5            gap-3 rounded-xl text-base   font-medium',
  lg:    'p-4                  gap-3 rounded-xl text-lg     font-medium',
  xl:    'h-[52px]   p-5       gap-3 rounded-xl text-[22px] font-bold',
  '2xl': 'h-10       p-5       gap-3 rounded-xl text-[22px] font-bold',
}

// Sizes for Text variant 

const textSizeClasses: Record<ButtonSize, string> = {
  xs:    'h-7        p-3           gap-2 rounded-lg text-xs     font-medium',
  sm:    'h-8        p-3           gap-2 rounded-lg text-sm     font-medium',
  md:    'h-[44px] px-[10px]        gap-3 rounded-lg text-base   font-medium',
  lg:    'p-4                      gap-3 rounded-lg text-lg     font-medium',
  xl:    'h-[52px]   p-5           gap-3 rounded-lg text-[22px] font-bold',
  '2xl': 'h-10       p-5           gap-3 rounded-lg text-[22px] font-bold',
}

// Icon sizes per button size: 14 / 16 / 18 / 20 / 22 / 24 px
// Note: custom spacing scale — size-4=12px, size-5=16px, size-6=24px
const iconSizeClasses: Record<ButtonSize, string> = {
  xs:    'size-[14px] shrink-0',
  sm:    'size-5      shrink-0',
  md:    'size-[18px] shrink-0',
  lg:    'size-[20px] shrink-0',
  xl:    'size-[22px] shrink-0',
  '2xl': 'size-6      shrink-0',
}

// Colors derived from Figma

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-primary text-primary-light',
    'hover:bg-primary-active',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-darker',
    'disabled:bg-primary-light-active disabled:text-primary-light disabled:cursor-not-allowed',
  ),

  secondary: cn(
    'bg-accent-darker text-accent-light',
    'hover:bg-accent-dark-active',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-accent',
    'disabled:bg-secondary-light disabled:text-accent disabled:cursor-not-allowed',
  ),

  text: cn(
    'bg-transparent text-primary',
    'hover:bg-primary-light-hover',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary',
    'disabled:bg-text-btn-disabled-bg disabled:text-primary-light-active disabled:cursor-not-allowed',
  ),

  outline: cn(
    'bg-transparent border-2 border-primary text-primary',
    'hover:bg-primary-light-hover hover:border-transparent',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-primary',
    'disabled:border-primary-light-active disabled:text-primary-light-active disabled:cursor-not-allowed',
  ),
}

export function Button({
  size = 'md',
  variant = 'primary',
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'transition-colors cursor-pointer',
        (variant === 'text' || variant === 'outline') ? textSizeClasses[size] : sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className={iconSizeClasses[size]}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={iconSizeClasses[size]}>{rightIcon}</span>}
    </button>
  )
}
