import { addMonths, format } from 'date-fns'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DayPicker, type DateRange } from 'react-day-picker'
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

function formatRange(range: DateRange | undefined) {
  if (!range?.from) return 'Select range'
  const from = format(range.from, 'd MMM, yyyy')
  if (!range.to) return from
  return `${from} - ${format(range.to, 'd MMM, yyyy')}`
}

interface MonthSelectorProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  minDate?: Date
  maxDate?: Date
}

export function MonthSelector({
  value: controlledValue,
  onChange: controlledOnChange,
  minDate,
  maxDate,
}: MonthSelectorProps) {
  const [internalRange, setInternalRange] = useState<DateRange | undefined>(undefined)
  const [month, setMonth] = useState(() => new Date())
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const goToMonthRef = useRef<(date: Date) => void>(setMonth)
  goToMonthRef.current = setMonth

  const value = controlledValue !== undefined ? controlledValue : internalRange

  function handleSelect(range: DateRange | undefined) {
    if (controlledOnChange) controlledOnChange(range)
    else setInternalRange(range)
  }

  // Stable component — never recreated, reads goToMonthRef via closure
  const MonthCaption = useMemo(() => {
    return function MonthCaption({
      calendarMonth,
      displayIndex,
    }: {
      calendarMonth: { date: Date }
      displayIndex: number
    }) {
      const label = format(calendarMonth.date, 'MMMM yyyy')

      if (displayIndex === 0) {
        return (
          <div className="mb-4">
            <span className="text-[18px] font-bold text-[#020617] leading-[1.556em]">{label}</span>
          </div>
        )
      }

      return (
        <div className="flex items-center justify-between mb-4">
          <span className="text-[18px] font-bold text-[#020617] leading-[1.556em]">{label}</span>
          <button
            type="button"
            onClick={() => goToMonthRef.current(addMonths(calendarMonth.date, 1))}
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
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-[#E6E6E6] bg-white p-3 shadow-sm hover:border-[#d0d0d0] focus:outline-none w-[250px] transition-colors"
      >
        <CalendarDaysIcon className="h-5 w-5 text-[#505152] shrink-0" />
        <span className="flex-1 text-left font-medium text-[#020617] text-[14px]">
          {formatRange(value)}
        </span>
        {open
          ? <ChevronUpIcon className="h-4 w-4 text-[#505152] shrink-0" />
          : <ChevronDownIcon className="h-4 w-4 text-[#505152] shrink-0" />
        }
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-20 right-0 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 px-3">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            numberOfMonths={2}
            weekStartsOn={1}
            startMonth={minDate}
            endMonth={maxDate}
            showOutsideDays={false}
            components={{ MonthCaption }}
            classNames={{
              months: 'flex gap-6',
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
              range_start: '[&>button]:!bg-primary [&>button]:!text-white',
              range_end: '[&>button]:!bg-primary [&>button]:!text-white',
              range_middle: 'bg-primary-light [&>button]:!text-primary [&>button]:!rounded-none [&>button]:!bg-transparent',
              outside: 'invisible pointer-events-none',
              disabled: 'opacity-30 pointer-events-none',
            }}
          />
        </div>
      )}
    </div>
  )
}
