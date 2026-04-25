import { useState } from 'react'
import { CalendarIcon, ClockIcon, ChevronDownIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Interview } from '../../services/interviews'
import { ScheduleInterviewModal } from './ScheduleInterviewModal'

interface InterviewScheduleCardProps {
  interviews?: Interview[]
}

export function InterviewScheduleCard({ interviews = [] }: InterviewScheduleCardProps) {
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null)

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#E6E6E6] bg-white p-5">

      {/* Header */}
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-body-xl font-medium text-[#000000]">Interview Schedule</span>

        <div className="flex flex-row items-center gap-4">
          <button
            type="button"
            className="flex flex-row items-center gap-1 rounded-lg border border-[#E6E6E6] bg-white px-3 py-2"
          >
            <CalendarIcon className="size-3.5 text-secondary" />
            <span className="text-body-sm font-medium text-secondary">All</span>
            <ChevronDownIcon className="size-3 text-secondary" />
          </button>

          <button
            type="button"
            className="flex h-9 items-center justify-center rounded-lg px-2 text-[14px] font-medium text-[#4F46E5] transition hover:bg-[#EDEDFC]"
          >
            See all
          </button>
        </div>
      </div>

      {/* Schedule cards list */}
      <div className="flex w-full flex-col gap-2">
        {interviews.length === 0 ? (
          <p className="py-6 text-center text-body-md text-neutral-muted">No interviews scheduled.</p>
        ) : (
          interviews.map((item) => {
            const scheduled = new Date(item.scheduledAt)
            const date = scheduled.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
            const startTime = scheduled.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            const endTime = item.endAt
              ? new Date(item.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              : ''
            const candidateName = item.application
              ? `${item.application.candidate.firstName} ${item.application.candidate.lastName}`
              : '—'
            const role = item.application?.job.title ?? '—'
            const interviewType = item.type.charAt(0) + item.type.slice(1).toLowerCase() + ' Interview'

            return (
              <div
                key={item.id}
                className="flex w-full flex-col gap-3 rounded-xl bg-lightgray-light-active p-4"
              >
                {/* Top row: date + time + edit */}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center gap-1">
                      <CalendarIcon className="size-5 text-bg-gray-darker" />
                      <span className="text-body-md font-medium text-bg-gray-darker">{date}</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                      <ClockIcon className="size-5 text-bg-gray-darker" />
                      <span className="text-body-md font-medium text-bg-gray-darker">
                        {startTime}{endTime ? ` - ${endTime}` : ''}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingInterview(item)}
                    className="flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium text-[#4F46E5] transition hover:bg-[#EDEDFC]"
                  >
                    <PencilSquareIcon className="size-3.5" />
                    Edit
                  </button>
                </div>

                {/* Bottom row: candidate name + interview type badge */}
                <div className="flex w-full flex-row items-center justify-between">
                  <span className="text-body-lg font-medium text-secondary">
                    {candidateName} - {role}
                  </span>
                  <div className="flex flex-row items-center justify-center rounded-lg bg-primary-light px-2 py-1">
                    <span className="text-body-md font-medium text-bg-gray-dark-active">
                      {interviewType}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Edit Interview modal */}
      {editingInterview && editingInterview.application && (
        <ScheduleInterviewModal
          applicationId={editingInterview.applicationId}
          candidate={{
            id: '',
            firstName: editingInterview.application.candidate.firstName,
            lastName: editingInterview.application.candidate.lastName,
            email: '',
            phone: '',
          }}
          jobTitle={editingInterview.application.job.title}
          interview={editingInterview}
          onClose={() => setEditingInterview(null)}
        />
      )}

    </div>
  )
}
