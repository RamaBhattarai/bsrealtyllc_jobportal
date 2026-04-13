import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ScheduleCardProps {
  date: string
  timeStart: string
  timeEnd: string
  candidateName: string
  jobTitle: string
  interviewType: string
}

export function ScheduleCard({
  date,
  timeStart,
  timeEnd,
  candidateName,
  jobTitle,
  interviewType,
}: ScheduleCardProps) {
  return (
    <div className="flex w-[520px] flex-col gap-[12px] rounded-xl bg-[#F7F8F9] p-[16px]">

      {/* Row 1 — date + time */}
      <div className="flex items-center gap-[12px]">
        {/* Date */}
        <div className="flex items-center gap-[4px]">
          <CalendarIcon className="size-[20px] shrink-0 text-[#575858]" />
          <span className="text-[14px] font-medium leading-[1.43] text-[#575858]">{date}</span>
        </div>
        {/* Time */}
        <div className="flex items-center gap-[4px]">
          <ClockIcon className="size-[20px] shrink-0 text-[#575858]" />
          <span className="text-[14px] font-medium leading-[1.43] text-[#575858]">
            {timeStart} - {timeEnd}
          </span>
        </div>
      </div>

      {/* Row 2 — candidate name + interview type */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-medium leading-[1.5] text-[#020617]">
          {candidateName} - {jobTitle}
        </span>
        <span className="rounded-lg bg-[#EDEDFC] px-[8px] py-[4px] text-[14px] font-medium leading-[1.43] text-[#707071]">
          {interviewType}
        </span>
      </div>

    </div>
  )
}
