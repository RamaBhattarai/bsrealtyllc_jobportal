import { ClockIcon } from '@heroicons/react/24/outline'

type ScheduleSlotVariant = 'active' | 'default'

interface ScheduleSlotProps {
  timeStart: string
  timeEnd: string
  candidateName: string
  variant?: ScheduleSlotVariant
}

export function ScheduleSlot({
  timeStart,
  timeEnd,
  candidateName,
  variant = 'default',
}: ScheduleSlotProps) {
  const isActive = variant === 'active'

  return (
    <div
      className={`flex w-[155px] flex-col gap-[2px] rounded px-[8px] py-[4px] ${
        isActive ? 'bg-[#C8C6F7]' : 'bg-white border border-[#E6E6E6]'
      }`}
    >
      {/* Time row */}
      <div className="flex items-center gap-[4px]">
        <ClockIcon className="size-[16px] shrink-0 text-[#575858]" />
        <div className="flex items-center">
          <span className="text-[12px] font-medium leading-[1.33] text-[#575858]">{timeStart}</span>
          <span className="text-[14px] font-medium text-[#575858]"> - </span>
          <span className="text-[12px] font-medium leading-[1.33] text-[#575858]">{timeEnd}</span>
        </div>
      </div>

      {/* Candidate name */}
      <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">
        {candidateName}
      </span>
    </div>
  )
}
