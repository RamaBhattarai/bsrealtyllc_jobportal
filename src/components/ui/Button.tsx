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

// Sizes for Primary & Secondary — derived from Figma
// xs:  padding 8px,       height 32px, gap 4px,  radius 8px,  font 12px/500
// sm:  padding 8px 12px,  height 40px, gap 4px,  radius 12px, font 14px/500
// md:  padding 12px 16px, hug,         gap 8px,  radius 12px, font 16px/500
// lg:  padding 12px,      hug,         gap 8px,  radius 12px, font 18px/500
// xl:  padding 16px,      height 52px, gap 8px,  radius 12px, font 22px/700
// 2xl: padding 16px,      height 56px, gap 8px,  radius 12px, font 22px/700
const sizeClasses: Record<ButtonSize, string> = {
  xs:    'h-7        p-3       gap-2 rounded-lg text-xs     font-medium',
  sm:    'h-8        py-3 px-4 gap-2 rounded-xl text-sm     font-medium',
  md:    'py-4 px-5            gap-3 rounded-xl text-base   font-medium',
  lg:    'p-4                  gap-3 rounded-xl text-lg     font-medium',
  xl:    'h-[52px]   p-5       gap-3 rounded-xl text-[22px] font-bold',
  '2xl': 'h-10       p-5       gap-3 rounded-xl text-[22px] font-bold',
}

// Sizes for Text variant — derived from Figma 
// All sizes use radius 8px; sm/md have narrower horizontal padding than primary/secondary
// xs:  padding 8px,       height 32px, gap 4px,  radius 8px,  font 12px/500
// sm:  padding 8px,       height 40px, gap 4px,  radius 8px,  font 14px/500
// md:  padding 12px 10px, hug,         gap 8px,  radius 8px,  font 16px/500
// lg:  padding 12px,      hug,         gap 8px,  radius 8px,  font 18px/500
// xl:  padding 16px,      height 52px, gap 8px,  radius 8px,  font 22px/700
// 2xl: padding 16px,      height 56px, gap 8px,  radius 8px,  font 22px/700
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
//
// Primary  — bg #4F46E5  text #EDEDFC  hover #3F38B7  disabled-bg #C8C6F7  ring #1C1950
// Secondary— bg #3A3F58  text #F6F8FF  hover #4A5171  disabled-bg #E7E8EA  ring #A5B4FC
// Text     — bg transparent text #4F46E5 hover-bg #E5E3FB  disabled-bg #EFE9EC  ring #4F46E5
// Outline  — border-2 #4F46E5 transparent-bg text #4F46E5  hover-bg #E5E3FB  ring #4F46E5
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

  // Figma node 29:1111 — Access component set
  // Focused (rest): transparent bg, 2px solid #4F46E5 border, h-[44px], padding 16px 10px
  // Hover:          #E5E3FB bg, border fades away
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
