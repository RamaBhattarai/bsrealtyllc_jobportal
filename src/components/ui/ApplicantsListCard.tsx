import { DocumentIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { getApplications } from '../../services/applications'

const STATUS_CONFIG: Record<string, { dot: string; label: string }> = {
  'HIRED':      { dot: 'bg-[#22C55E]', label: 'Hired' },
  'SCREENING':  { dot: 'bg-[#F59E0B]', label: 'Screening' },
  'OFFERED':    { dot: 'bg-[#4F46E5]', label: 'Job Offer' },
  'REJECTED':   { dot: 'bg-[#F43F5E]', label: 'Rejected' },
  'INTERVIEW':  { dot: 'bg-[#3B82F6]', label: 'Interview' },
}

export function ApplicantsListCard() {
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  })
  const total = applications.length
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
          {isLoading ? (
            <p className="py-8 text-center text-[14px] text-[#707071]">Loading applicants...</p>
          ) : applications.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-[#707071]">No applicants found.</p>
          ) : (
            applications.map((application) => {
              const { candidate, job, status, appliedAt } = application
              const { dot, label } = STATUS_CONFIG[status] ?? { dot: 'bg-[#707071]', label: status }
              const date = new Date(appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              return (
                <div
                  key={application.id}
                  className="flex items-center justify-between border-b border-[#E0E1E2] px-5 py-4 last:border-b-0"
                >
                  {/* Name + Email */}
                  <div className="flex flex-1 flex-col">
                    <span className="text-[16px] font-medium leading-normal text-[#020617]">
                      {candidate.firstName} {candidate.lastName}
                    </span>
                    <span className="text-[14px] font-normal leading-[1.43] text-bg-gray-dark-hover">{candidate.email}</span>
                  </div>

                  {/* Role */}
                  <span className="flex-1 text-[14px] font-medium leading-[1.43] text-[#020617]">{job.title}</span>

                  {/* Date */}
                  <span className="flex-1 text-[14px] font-medium leading-[1.43] text-[#020617]">{date}</span>

                  {/* Resume + Status grouped */}
                  <div className="flex w-[351px] items-center justify-between">
                    {candidate.resumeUrl ? (
                      <a
                        href={`http://localhost:5000/${candidate.resumeUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 rounded-lg bg-[#EDEDFC] px-3 py-2 text-[14px] font-medium leading-[1.43] text-[#707071] transition-colors hover:bg-[#E0E0FA]"
                      >
                        <DocumentIcon className="size-5" />
                        View Resume
                      </a>
                    ) : (
                      <span className="text-[14px] text-[#707071]">No resume</span>
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`size-2 shrink-0 rounded-full ${dot}`} />
                      <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">{label}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}
