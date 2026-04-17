import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { cn } from '../../lib/cn'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchBar({
  placeholder = 'Search',
  value,
  onChange,
  className,
}: SearchBarProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={cn(
        'flex w-[540px] items-center gap-[8px] rounded-full border px-[16px] py-[12px] transition-colors',
        focused ? 'border-[#B1B2B7]' : 'border-[#C7C8C9]',
        className,
      )}
    >
      <MagnifyingGlassIcon
        className={cn('size-[18px] shrink-0', focused ? 'text-[#575858]' : 'text-[#BBBCBC]')}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          'flex-1 bg-transparent text-[14px] font-medium leading-[1.43] outline-none placeholder:text-[#BBBCBC]',
          focused ? 'text-[#575858]' : 'text-[#BBBCBC]',
        )}
      />
    </div>
  )
}
