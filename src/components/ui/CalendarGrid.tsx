import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  isSameDay,
} from 'date-fns'
import { ClockIcon } from '@heroicons/react/24/outline'

export interface CalendarEvent {
  id: string
  date: Date
  startTime: string   // e.g. "14:00"
  endTime: string     // e.g. "16:00 PM"
  candidateName: string
  variant?: 'active' | 'normal'
}

interface CalendarGridProps {
  month: Date
  events?: CalendarEvent[]
}

function InterviewCard({ event }: { event: CalendarEvent }) {
  const isActive = event.variant === 'active'
  return (
    <div
      className={`rounded-[4px] px-3 py-2 flex flex-col gap-1 ${
        isActive ? 'bg-primary-light-active' : 'bg-whites'
      }`}
    >
      {/* Time row */}
      <div className="flex items-center gap-1">
        <ClockIcon className="h-5 w-5 shrink-0 text-bg-gray-darker" />
        <span className="text-body-sm font-medium text-bg-gray-darker whitespace-nowrap">
          {event.startTime}-{event.endTime}
        </span>
      </div>
      {/* Candidate name */}
      <p className="text-body-md font-medium text-secondary">
        {event.candidateName}
      </p>
    </div>
  )
}

export function CalendarGrid({ month, events = [] }: CalendarGridProps) {
  // Build all days shown in the calendar (Sunday-first, filling partial first/last weeks)
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end:   endOfWeek(endOfMonth(month),     { weekStartsOn: 1 }),
  })

  return (
    <div className="grid grid-cols-7 gap-2 bg-white flex-1 w-full">
      {days.map((day) => {
        const inMonth  = isSameMonth(day, month)
        const dayEvents = events.filter((e) => isSameDay(e.date, day))

        return (
          <div
            key={day.toISOString()}
            className={`relative min-h-[156px] rounded-[4px] p-2 ${
              inMonth ? 'bg-whites-hover' : 'bg-slateblue-light'
            }`}
          >
            {/* Day number — top right */}
            <span
              className={`absolute top-3 right-3 text-body-sm font-normal ${
                inMonth ? 'text-secondary' : 'text-slateblue'
              }`}
            >
              {format(day, 'dd')}
            </span>

            {/* Interview event cards */}
            {dayEvents.length > 0 && (
              <div className="mt-7 flex flex-col gap-1">
                {dayEvents.map((event) => (
                  <InterviewCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
