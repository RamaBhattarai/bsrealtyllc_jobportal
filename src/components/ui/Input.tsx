import type { InputHTMLAttributes, ReactNode } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label rendered above the field */
  label?: string
  /** Helper text rendered below (hidden when error is shown) */
  hint?: string
  /** Puts the field into error state — swaps border to red + shows exclamation icon */
  error?: boolean
  /** Error message rendered below when error=true */
  errorMessage?: string
  /** Icon rendered on the right inside the field (20×20) */
  rightIcon?: ReactNode
}



export function Input({
  label,
  hint,
  error = false,
  errorMessage,
  rightIcon,
  id,
  disabled,
  className = '',
  ...props
}: InputProps) {
  const message = error ? errorMessage : hint

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="select-none text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex items-center',
          'py-4 px-5',
          'rounded-sm border',
          'transition-colors',
          disabled ? 'bg-gray-200' : 'bg-white',
          error
            ? 'border-error'
            : disabled
            ? 'border-gray-200'
            : 'border-gray-400 hover:border-gray-600 focus-within:border-primary-darker',
          className,
        )}
      >
        <input
          id={id}
          disabled={disabled}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none',
            'text-base font-normal leading-normal text-gray-900',
            'placeholder:text-gray-800 focus:placeholder:text-gray-500',
            disabled && 'cursor-not-allowed',
          )}
          {...props}
        />

        {/* Right icons — rightIcon (e.g. eye toggle) + exclamation on error */}
        {(rightIcon || error) && (
          <span className="ml-3 flex shrink-0 items-center gap-2">
            {rightIcon && (
              <span className="flex size-5 items-center justify-center text-gray-800">
                {rightIcon}
              </span>
            )}
            {error && (
              <ExclamationCircleIcon className="size-5 shrink-0 text-error" />
            )}
          </span>
        )}
      </div>

      {message && (
        <p className={cn('text-sm leading-normal', error ? 'text-error' : 'text-gray-600')}>
          {message}
        </p>
      )}
    </div>
  )
}
