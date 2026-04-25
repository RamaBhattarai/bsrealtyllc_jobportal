import { PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { SingleMonthSelector } from '../components/ui/SingleMonthSelector'
import { CalendarGrid } from '../components/ui/CalendarGrid'
import { ScheduleInterviewModal } from '../components/ui/ScheduleInterviewModal'
import { getApplications } from '../services/applications'
import { getInterviews } from '../services/interviews'
import type { Application } from '../services/applications'
import type { CalendarEvent } from '../components/ui/CalendarGrid'

export function CalendarPage() {
  const [month, setMonth] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  const { data: applications = [] } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
    enabled: showPicker,
  })

  const { data: interviews = [] } = useQuery({
    queryKey: ['interviews'],
    queryFn: getInterviews,
  })

  const calendarEvents: CalendarEvent[] = interviews.map((iv, i) => {
    const scheduled = new Date(iv.scheduledAt)
    const startTime = scheduled.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    const endTime = iv.endAt
      ? new Date(iv.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      : (() => {
          const end = new Date(scheduled.getTime() + (iv.durationMins ?? 60) * 60000)
          return end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        })()
    const candidateName = iv.application
      ? `${iv.application.candidate.firstName} ${iv.application.candidate.lastName}`
      : '—'
    return {
      id: iv.id,
      date: scheduled,
      startTime,
      endTime,
      candidateName,
      variant: i % 2 === 0 ? 'active' : 'normal',
    }
  })

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
              onClick={() => setShowPicker(true)}
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
          <CalendarGrid month={month} events={calendarEvents} />

        </main>
      </div>

      {/* ── Application picker ──────────────────────────────────── */}
      {showPicker && !selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="flex w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-lightgray px-6 py-5">
              <h2 className="text-[16px] font-semibold text-[#020617]">Select Candidate</h2>
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-[#707071] transition hover:bg-[#F7F8F9]"
              >
                <PlusIcon className="size-5 rotate-45" />
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto px-6 py-4 max-h-96">
              {applications.length === 0 ? (
                <p className="py-8 text-center text-[14px] text-[#707071]">No applications found.</p>
              ) : (
                applications.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => { setSelectedApp(app); setShowPicker(false) }}
                    className="flex items-center gap-3 rounded-xl border border-[#E6E6E6] px-4 py-3 text-left transition hover:bg-[#F7F8F9]"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EDEDFC] text-[13px] font-semibold text-[#4F46E5]">
                      {app.candidate.firstName.charAt(0)}{app.candidate.lastName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-[#020617]">
                        {app.candidate.firstName} {app.candidate.lastName}
                      </span>
                      <span className="text-[12px] text-[#707071]">{app.job.title}</span>
                    </div>
                    <ChevronDownIcon className="ml-auto size-4 -rotate-90 text-[#707071]" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Schedule Interview modal ─────────────────────────────── */}
      {selectedApp && (
        <ScheduleInterviewModal
          applicationId={selectedApp.id}
          candidate={selectedApp.candidate}
          jobTitle={selectedApp.job.title}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  )
}
