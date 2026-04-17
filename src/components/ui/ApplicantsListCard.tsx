import { DocumentIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

type ApplicantStatus = 'Hired' | 'Screening' | 'Job Offer' | 'Rejected'

interface Applicant {
  name: string
  email: string
  role: string
  date: string
  status: ApplicantStatus
}

const STATUS_CONFIG: Record<ApplicantStatus, { dot: string; label: string }> = {
  'Hired':     { dot: 'bg-[#22C55E]', label: 'Hired' },
  'Screening': { dot: 'bg-[#F59E0B]', label: 'Screening' },
  'Job Offer': { dot: 'bg-[#4F46E5]', label: 'Job Offer' },
  'Rejected':  { dot: 'bg-[#F43F5E]', label: 'Rejected' },
}

const DEFAULT_APPLICANTS: Applicant[] = [
  { name: 'Alex Johnson',  email: 'alex.12@gmail.com',    role: 'Software Developer', date: 'April 08, 2026', status: 'Hired' },
  { name: 'Jonah Neuman',  email: 'neuman.01@gmail.com',  role: 'UI/UX Designer',     date: 'Apr 10, 2026',   status: 'Screening' },
  { name: 'Alex Johnson',  email: 'alex.12@gmail.com',    role: 'Customer Support',   date: 'Apr 22, 2026',   status: 'Job Offer' },
  { name: 'Jonah Neuman',  email: 'neuman.01@gmail.com',  role: 'Marketing',          date: 'Apr 14, 2026',   status: 'Rejected' },
]

interface ApplicantsListCardProps {
  applicants?: Applicant[]
  total?: number
}

export function ApplicantsListCard({ applicants = DEFAULT_APPLICANTS, total = 100 }: ApplicantsListCardProps) {
  return (
    <div className="flex w-full flex-col gap-[24px] rounded-[12px] border border-[#E6E6E6] bg-white p-[20px]">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-[4px]">
          <span className="text-[18px] font-medium leading-[1.556] text-[#000000]">Applicants List</span>
          <span className="text-[16px] font-medium leading-[1.5] text-[#707071]">({total})</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[16px]">
          {/* Sort by */}
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px] font-medium leading-[1.43] text-[#67686A]">Sort by:</span>
            <button
              type="button"
              className="flex items-center gap-[4px] rounded-[8px] border border-[#E6E6E6] bg-white px-[8px] py-[4px] text-[14px] font-medium leading-[1.43] text-[#505152] hover:bg-[#F9FAFB]"
            >
              Name
              <ChevronDownIcon className="size-[12px]" />
            </button>
          </div>

          {/* See all */}
          <button
            type="button"
            className="flex h-[36px] items-center rounded-[8px] px-[8px] text-[14px] font-medium leading-[1.43] text-[#4F46E5] transition-colors hover:bg-[#EDEDFC]"
          >
            See all
          </button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[4px]">

        {/* Column headers */}
        <div className="flex h-[56px] items-center justify-between rounded-[8px] bg-[#E0E1E2] px-[28px]">
          {['Name', 'Role', 'Date'].map((col) => (
            <span key={col} className="flex-1 text-[16px] font-medium leading-[1.5] text-[#575858]">{col}</span>
          ))}
          <div className="flex w-[351px] items-center justify-between">
            <span className="text-[16px] font-medium leading-[1.5] text-[#575858]">Resume</span>
            <span className="text-[16px] font-medium leading-[1.5] text-[#575858]">Status</span>
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col pt-[8px]">
          {applicants.map((applicant, idx) => {
            const { dot, label } = STATUS_CONFIG[applicant.status]
            return (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-[#E0E1E2] px-[20px] py-[16px] last:border-b-0"
              >
                {/* Name + Email */}
                <div className="flex flex-1 flex-col">
                  <span className="text-[16px] font-medium leading-[1.5] text-[#020617]">{applicant.name}</span>
                  <span className="text-[14px] font-normal leading-[1.43] text-[#959697]">{applicant.email}</span>
                </div>

                {/* Role */}
                <span className="flex-1 text-[14px] font-medium leading-[1.43] text-[#020617]">{applicant.role}</span>

                {/* Date */}
                <span className="flex-1 text-[14px] font-medium leading-[1.43] text-[#020617]">{applicant.date}</span>

                {/* Resume + Status grouped */}
                <div className="flex w-[351px] items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center gap-[4px] rounded-[8px] bg-[#EDEDFC] px-[12px] py-[8px] text-[14px] font-medium leading-[1.43] text-[#707071] transition-colors hover:bg-[#E0E0FA]"
                  >
                    <DocumentIcon className="size-[20px]" />
                    View Resume
                  </button>
                  <div className="flex items-center gap-[8px]">
                    <span className={`size-[8px] shrink-0 rounded-full ${dot}`} />
                    <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">{label}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
