import { addMonths, format } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

interface SingleMonthSelectorProps {
  /** The currently selected month (any date within the month). Defaults to today's month. */
  value?: Date
  onChange?: (month: Date) => void
}

export function SingleMonthSelector({ value: controlledValue, onChange }: SingleMonthSelectorProps) {
  const [internalMonth, setInternalMonth] = useState<Date>(() => controlledValue ?? new Date())
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const month = controlledValue ?? internalMonth

  // Always-current handler ref — used inside the stable MonthCaption so it never goes stale
  const handleRef = useRef<(d: Date) => void>(() => {})
  handleRef.current = (d: Date) => {
    if (!controlledValue) setInternalMonth(d)
    onChange?.(d)
  }

  // Stable caption component — reads handleRef via closure so it never re-mounts DayPicker
  const MonthCaption = useMemo(() => {
    return function MonthCaption({ calendarMonth }: { calendarMonth: { date: Date }; displayIndex: number }) {
      const label = format(calendarMonth.date, 'MMMM yyyy')
      return (
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => handleRef.current(addMonths(calendarMonth.date, -1))}
            className="flex items-center justify-center w-4.75 h-4.75 text-[#505152] hover:text-primary transition-colors shrink-0"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="w-4.75 h-4.75" />
          </button>
          <span className="text-[18px] font-bold text-[#020617] leading-[1.556em]">{label}</span>
          <button
            type="button"
            onClick={() => handleRef.current(addMonths(calendarMonth.date, 1))}
            className="flex items-center justify-center w-4.75 h-4.75 text-[#505152] hover:text-primary transition-colors shrink-0"
            aria-label="Next month"
          >
            <ChevronRightIcon className="w-4.75 h-4.75" />
          </button>
        </div>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-[#E6E6E6] bg-white p-3 shadow-sm hover:border-[#d0d0d0] focus:outline-none transition-colors"
      >
        <CalendarDaysIcon className="h-4 w-4 text-[#020617] shrink-0" />
        <span className="font-medium text-[#020617] text-[14px]">{format(month, 'MMM, yyyy')}</span>
        {open
          ? <ChevronUpIcon className="h-3 w-3 text-[#505152] shrink-0" />
          : <ChevronDownIcon className="h-3 w-3 text-[#505152] shrink-0" />
        }
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 right-0 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 px-3">
          <DayPicker
            mode="single"
            month={month}
            onMonthChange={(d) => handleRef.current(d)}
            onDayClick={() => setOpen(false)}
            numberOfMonths={1}
            weekStartsOn={1}
            showOutsideDays={false}
            components={{ MonthCaption }}
            classNames={{
              months: 'flex',
              month: 'flex flex-col w-[256px] px-3 py-6',
              nav: 'hidden',
              weekdays: 'flex justify-between mb-2',
              weekday: 'flex-1 text-center text-[14px] font-medium text-[#575858]',
              weeks: 'flex flex-col gap-1',
              week: 'flex justify-between',
              day: 'flex-1 flex justify-center',
              day_button: [
                'w-8 h-8 flex items-center justify-center rounded-full',
                'text-[14px] font-medium text-[#505152]',
                'hover:bg-[#f0f1f2] transition-colors cursor-pointer',
              ].join(' '),
              selected: '[&>button]:!bg-primary [&>button]:!text-white',
              today: '[&>button]:!font-bold [&>button]:!text-primary',
              outside: 'invisible pointer-events-none',
              disabled: 'opacity-30 pointer-events-none',
            }}
          />
        </div>
      )}
    </div>
  )
}
