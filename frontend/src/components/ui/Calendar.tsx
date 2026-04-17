import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

/**
 * Calendar — dual-month date picker matching Figma node 252:176.
 *
 * Figma specs extracted from MCP:
 *  - Two months side-by-side (Frame 75 / 76 variants)
 *  - Week starts Monday (Mon … Sun header row)
 *  - Day cell: 32×32px, Inter 500 14px, #505152
 *  - Day headers: Inter 500 14px, #575858
 *  - Month title: Inter 500 18px, #020617
 *  - Card padding: 24px 12px, gap 16px, rounded-[9px], white bg
 *  - Chevron nav: 18.77×18.77, #505152
 *  - Selected day: filled circle with primary brand colour
 */

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  /** Default month to show. Defaults to current month. */
  defaultMonth?: Date
}

export function Calendar({ selected, onSelect, defaultMonth }: CalendarProps) {
  const [month, setMonth] = useState<Date>(defaultMonth ?? new Date())

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      month={month}
      onMonthChange={setMonth}
      numberOfMonths={2}
      weekStartsOn={1}
      showOutsideDays={false}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeftIcon className="h-4.75 w-4.75" />
          ) : (
            <ChevronRightIcon className="h-4.75 w-4.75" />
          ),
      }}
      classNames={{
        root: 'inline-flex',
        months:
          'flex items-start gap-1 bg-white rounded-lg shadow-sm px-6 py-0 relative',
        month: 'flex flex-col gap-4 rounded-[9px] bg-white px-3 py-6',
        month_caption:
          'flex items-center justify-between mb-0',
        caption_label:
          'font-medium text-[#020617] text-[18px] leading-[1.556em]',
        nav: 'absolute inset-x-0 top-[28px] flex items-center justify-between px-1 pointer-events-none',
        button_previous:
          'pointer-events-auto flex h-[19px] w-[19px] items-center justify-center text-[#505152] hover:text-primary transition-colors',
        button_next:
          'pointer-events-auto flex h-[19px] w-[19px] items-center justify-center text-[#505152] hover:text-primary transition-colors',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex items-center justify-between',
        weekday:
          'flex h-8 w-8 items-center justify-center text-center font-medium text-[#575858] text-[14px] leading-[1.43em]',
        week: 'flex items-center justify-between mt-1',
        day: 'p-0',
        day_button: [
          'flex h-8 w-8 items-center justify-center rounded-full',
          'font-medium text-[14px] leading-[1.43em] text-[#505152]',
          'transition-colors hover:bg-[#f0f1f2] cursor-pointer',
        ].join(' '),
        selected: '[&>button]:!bg-primary [&>button]:!text-white [&>button]:hover:!bg-primary',
        today: '[&>button]:!font-semibold [&>button]:!text-primary',
        outside: 'opacity-0 pointer-events-none',
        disabled: 'opacity-40 pointer-events-none',
      }}
    />
  )
}
