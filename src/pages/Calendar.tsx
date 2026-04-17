import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { SingleMonthSelector } from '../components/ui/SingleMonthSelector'
import { CalendarGrid } from '../components/ui/CalendarGrid'
import type { CalendarEvent } from '../components/ui/CalendarGrid'

const MOCK_EVENTS: CalendarEvent[] = [
  { id: '1', date: new Date(2026, 3, 1),  startTime: '10:00', endTime: '11:00 AM', candidateName: 'Emma Davis',   variant: 'active' },
  { id: '2', date: new Date(2026, 3, 3),  startTime: '14:00', endTime: '15:00 PM', candidateName: 'Emma Davis',   variant: 'normal' },
  { id: '3', date: new Date(2026, 3, 9),  startTime: '09:00', endTime: '10:00 AM', candidateName: 'Emma Davis',   variant: 'normal' },
  { id: '4', date: new Date(2026, 3, 13), startTime: '11:00', endTime: '12:00 PM', candidateName: 'Emma Davis',   variant: 'active' },
  { id: '5', date: new Date(2026, 3, 17), startTime: '15:00', endTime: '16:00 PM', candidateName: 'Emma Davis',   variant: 'normal' },
  { id: '6', date: new Date(2026, 3, 21), startTime: '13:00', endTime: '14:00 PM', candidateName: 'Emma Davis',   variant: 'normal' },
]

export function CalendarPage() {
  const [month, setMonth] = useState(new Date())

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Topbar />

        <main className="flex flex-col flex-1 overflow-y-auto min-w-0 px-6 pb-6">

          {/* ── Top bar ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3 py-6">
            <SingleMonthSelector value={month} onChange={setMonth} />

            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-body-md font-medium text-primary-light transition-colors hover:bg-primary-hover active:bg-primary-active"
            >
              <PlusIcon className="h-5 w-5" />
              Schedule Interview
            </button>
          </div>

          {/* ── Weekday header row ──────────────────────────────────── */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="px-2 pb-2 text-body-lg font-medium text-slateblue-darker">
                {day}
              </div>
            ))}
          </div>

          {/* ── Calendar grid ───────────────────────────────────── */}
          <CalendarGrid month={month} events={MOCK_EVENTS} />

        </main>
      </div>
    </div>
  )
}
