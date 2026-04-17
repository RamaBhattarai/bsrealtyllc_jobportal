import {
  ChartBarIcon,
  BriefcaseIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { StatusBadge } from './StatusBadge'

type StatusType = 'Active' | 'Pending' | 'Draft'

interface JobListCardProps {
  title: string
  department: string
  status?: StatusType
  level: string
  experienceRange: string
  tags: string[]
  applicantCount: number
  icon?: React.ReactNode
}

export function JobListCard({
  title,
  department,
  status = 'Active',
  level,
  experienceRange,
  tags,
  applicantCount,
  icon,
}: JobListCardProps) {
  return (
    <div className="flex w-[279px] flex-col gap-[12px] rounded-xl border border-[#E0E1E2] bg-[#F9FAFB] p-[20px]">

      {/* ── Main content (has bottom divider) ──────────────────── */}
      <div className="flex flex-col gap-[16px] border-b border-[#E6E6E6] pb-[16px]">

        {/* Row 1 — icon + status badge */}
        <div className="flex items-center justify-between">
          {/* Company icon */}
          <div className="flex size-[32px] items-center justify-center rounded-lg bg-[#C8C6F7] p-[4px]">
            {icon ?? (
              <svg viewBox="0 0 24 24" fill="none" className="size-[20px] text-[#4F46E5]">
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </div>

          {/* Status badge */}
          <StatusBadge status={status} />
        </div>

        {/* Row 2 — title + department */}
        <div className="flex flex-col gap-[4px]">
          <span className="text-[16px] font-medium leading-[1.5] text-[#232931]">{title}</span>
          <span className="text-[14px] font-normal leading-[1.43] text-[#595959]">{department}</span>
        </div>

        {/* Row 3 — level + experience */}
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <ChartBarIcon className="size-[20px] shrink-0 text-[#4B5768]" />
            <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">{level}</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <BriefcaseIcon className="size-[20px] shrink-0 text-[#4B5768]" />
            <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">
              {experienceRange}
              <span className="text-[#575858]"> Years Experience</span>
            </span>
          </div>
        </div>

        {/* Row 4 — tags */}
        <div className="flex h-[24px] items-center gap-[8px] overflow-hidden">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-lg bg-[#EDEDFC] px-[8px] py-[4px] text-[12px] font-medium leading-[1.33] text-[#707071]"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* ── Footer — applicants ─────────────────────────────────── */}
      <div className="flex items-center gap-[4px]">
        <UsersIcon className="size-[20px] shrink-0 text-[#595959]" />
        <span className="w-[113px] text-[14px] font-medium leading-[1.43] text-[#595959]">
          {applicantCount} Applicants
        </span>
      </div>

    </div>
  )
}
