import { CalendarIcon, ClockIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface ScheduleItem {
  date: string
  time: string
  candidateName: string
  role: string
  interviewType: string
}

interface InterviewScheduleCardProps {
  schedules?: ScheduleItem[]
}

const DEFAULT_SCHEDULES: ScheduleItem[] = [
  {
    date: 'Mon, 13 May',
    time: '14:00 - 16:00 PM',
    candidateName: 'Emma Davis',
    role: 'UI/UX Designer',
    interviewType: 'Technical Interview',
  },
  {
    date: 'Mon, 13 May',
    time: '14:00 - 16:00 PM',
    candidateName: 'Emma Davis',
    role: 'UI/UX Designer',
    interviewType: 'Technical Interview',
  },
]

export function InterviewScheduleCard({ schedules = DEFAULT_SCHEDULES }: InterviewScheduleCardProps) {
  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] border border-[#E6E6E6] bg-white p-[20px]">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex w-full flex-row items-center justify-between">
        <span className="text-body-xl font-medium text-[#000000]">Interview Schedule</span>

        <div className="flex flex-row items-center gap-[16px]">
          {/* Date range picker button */}
          <button
            type="button"
            className="flex flex-row items-center gap-[4px] rounded-[8px] border border-[#E6E6E6] bg-white px-[12px] py-[8px]"
          >
            <CalendarIcon className="size-[14px] text-secondary" />
            <span className="text-body-sm font-medium text-secondary">13 - 18 May</span>
            <ChevronDownIcon className="size-[12px] text-secondary" />
          </button>

          {/* See all */}
          <button
            type="button"
            className="flex h-[36px] flex-row items-center justify-center gap-[4px] rounded-[8px] bg-primary-light px-[8px] text-body-md font-medium text-primary"
          >
            See all
          </button>
        </div>
      </div>

      {/* ── Schedule cards list ────────────────────────────────────── */}
      <div className="flex w-full flex-col gap-[8px]">
        {schedules.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full flex-col gap-[12px] rounded-[12px] bg-lightgray-light-active p-[16px]"
          >
            {/* Top row: date + time */}
            <div className="flex flex-row items-center gap-[12px]">
              <div className="flex flex-row items-center gap-[4px]">
                <CalendarIcon className="size-[20px] text-bg-gray-darker" />
                <span className="text-body-md font-medium text-bg-gray-darker">{item.date}</span>
              </div>
              <div className="flex flex-row items-center gap-[4px]">
                <ClockIcon className="size-[20px] text-bg-gray-darker" />
                <span className="text-body-md font-medium text-bg-gray-darker">{item.time}</span>
              </div>
            </div>

            {/* Bottom row: candidate name + interview type badge */}
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-body-lg font-medium text-secondary">
                {item.candidateName} - {item.role}
              </span>
              <div className="flex flex-row items-center justify-center rounded-[8px] bg-primary-light px-[8px] py-[4px]">
                <span className="text-body-md font-medium text-bg-gray-dark-active">
                  {item.interviewType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
