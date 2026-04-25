import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { DocumentIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { getApplications, updateApplicationStatus } from '../services/applications'

type FilterTab = 'All' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED'

const FILTER_TABS: FilterTab[] = ['All', 'SCREENING', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED']

const FILTER_LABELS: Record<FilterTab, string> = {
  All: 'All',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  OFFERED: 'Job Offer',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
}

const STATUS_DOT: Record<string, string> = {
  SCREENING: 'bg-warning',
  INTERVIEW: 'bg-primary',
  OFFERED:   'bg-blue-500',
  HIRED:     'bg-success',
  REJECTED:  'bg-error',
}

const APPLICATION_STATUSES = ['SCREENING', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED'] as const

export function CandidatesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  })

  const { mutate: changeStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  })

  const filtered = activeFilter === 'All'
    ? applications
    : applications.filter((a) => a.status === activeFilter)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-gray">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">

          {/* ── Filter + Sort bar ──── */}
          <div className="flex items-center justify-between">

            {/* Category pills */}
            <div className="flex items-center gap-4">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className={[
                      'rounded-[20px] px-4 py-3 text-body-md font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-whites'
                        : 'bg-slateblue-light text-secondary hover:bg-slateblue-light-hover',
                    ].join(' ')}
                  >
                    {FILTER_LABELS[tab]}
                  </button>
                )
              })}
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-3">
              <span className="text-body-lg font-medium text-gray-700">Sort by:</span>
              <button
                type="button"
                className="flex items-center gap-2 rounded-[8px] border border-light-gray bg-white px-3 py-2 text-body-md font-medium text-lightgray-darker hover:bg-bg-gray"
              >
                Name
                <ChevronDownIcon className="size-4" />
              </button>
            </div>
          </div>

          {/* ── Candidates table ── */}
          <div className="mt-5 flex flex-col gap-2 rounded-[12px] border border-light-gray bg-white p-[20px]">

            {/* Column headers */}
            <div className="flex h-10 items-center justify-between rounded-[8px] bg-bg-gray-hover px-[28px]">
              {['Name', 'Role', 'Date'].map((col) => (
                <span key={col} className="flex-1 text-body-lg font-medium text-bg-gray-darker">{col}</span>
              ))}
              <div className="flex w-[351px] items-center justify-between">
                <span className="text-body-lg font-medium text-bg-gray-darker">Resume</span>
                <span className="text-body-lg font-medium text-bg-gray-darker">Status</span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col pt-3">
              {isLoading ? (
                <p className="py-8 text-center text-body-md text-neutral-muted">Loading candidates...</p>
              ) : filtered.length === 0 ? (
                <p className="py-8 text-center text-body-md text-neutral-muted">No candidates found.</p>
              ) : (
                filtered.map((application) => {
                  const { candidate, job, status, appliedAt } = application
                  const dot = STATUS_DOT[status] ?? 'bg-neutral-400'
                  const date = new Date(appliedAt).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })

                  return (
                    <div
                      key={application.id}
                      onClick={() => navigate(`/candidates/${application.id}`)}
                      className="flex cursor-pointer items-center justify-between border-b border-bg-gray-hover px-[20px] py-5 last:border-b-0 hover:bg-bg-gray"
                    >
                      {/* Name + Email */}
                      <div className="flex flex-1 flex-col">
                        <span className="text-body-lg font-medium text-secondary">
                          {candidate.firstName} {candidate.lastName}
                        </span>
                        <span className="text-body-md text-bg-gray-dark-hover">{candidate.email}</span>
                      </div>

                      {/* Role (job title) */}
                      <span className="flex-1 text-body-md font-medium text-secondary">{job.title}</span>

                      {/* Date applied */}
                      <span className="flex-1 text-body-md font-medium text-secondary">{date}</span>

                      {/* Resume + Status */}
                      <div className="flex w-[351px] items-center justify-between">
                        {candidate.resumeUrl ? (
                          <a
                            href={`http://localhost:5000/${candidate.resumeUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-[8px] bg-primary-light px-4 py-3 text-body-md font-medium text-neutral-muted transition-colors hover:bg-primary-light-hover"
                          >
                            <DocumentIcon className="size-[20px]" />
                            View Resume
                          </a>
                        ) : (
                          <span className="text-body-md text-neutral-muted">No resume</span>
                        )}
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <span className={`size-3 shrink-0 rounded-full ${dot}`} />
                          <select
                            aria-label="Application status"
                            value={status}
                            onChange={(e) => changeStatus({ id: application.id, status: e.target.value })}
                            className="rounded-lg border border-lightgray bg-white px-2 py-1 text-body-md font-medium text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                          >
                            {APPLICATION_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0) + s.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}
