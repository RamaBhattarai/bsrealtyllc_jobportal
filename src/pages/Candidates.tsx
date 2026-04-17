import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { DocumentIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

type Status = 'All' | 'Screening' | 'Job Offer' | 'Hired' | 'Rejected'

interface Candidate {
  name: string
  email: string
  role: string
  date: string
  status: Exclude<Status, 'All'>
}

const STATUS_CONFIG: Record<Exclude<Status, 'All'>, { dot: string }> = {
  'Hired':     { dot: 'bg-success' },
  'Screening': { dot: 'bg-warning' },
  'Job Offer': { dot: 'bg-primary' },
  'Rejected':  { dot: 'bg-error' },
}

const CANDIDATES: Candidate[] = [
  { name: 'Alex Johnson',   email: 'alex.12@gmail.com',      role: 'Software Developer', date: 'April 08, 2026', status: 'Hired'     },
  { name: 'Jonah Neuman',   email: 'neuman.01@gmail.com',    role: 'UI/UX Designer',     date: 'Apr 10, 2026',   status: 'Screening' },
  { name: 'Alex Johnson',   email: 'alex.12@gmail.com',      role: 'Customer Support',   date: 'Apr 22, 2026',   status: 'Job Offer' },
  { name: 'Jonah Neuman',   email: 'neuman.01@gmail.com',    role: 'Marketing',          date: 'Apr 14, 2026',   status: 'Rejected'  },
  { name: 'Sarah Kim',      email: 'sarah.kim@gmail.com',    role: 'Software Developer', date: 'Apr 15, 2026',   status: 'Screening' },
  { name: 'Mike Torres',    email: 'mike.t@gmail.com',       role: 'Graphic Designer',   date: 'Apr 16, 2026',   status: 'Hired'     },
  { name: 'Emma Davis',     email: 'emma.d@gmail.com',       role: 'UI/UX Designer',     date: 'Apr 17, 2026',   status: 'Job Offer' },
  { name: 'Chris Brown',    email: 'chris.b@gmail.com',      role: 'Marketing Manager',  date: 'Apr 18, 2026',   status: 'Rejected'  },
]

const FILTER_TABS: Status[] = ['All', 'Screening', 'Job Offer', 'Hired', 'Rejected']

export function CandidatesPage() {
  const [activeFilter, setActiveFilter] = useState<Status>('All')

  const filtered = activeFilter === 'All'
    ? CANDIDATES
    : CANDIDATES.filter((c) => c.status === activeFilter)

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
                    {tab}
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
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-body-md text-neutral-muted">No candidates found.</p>
              ) : (
                filtered.map((candidate, idx) => {
                  const { dot } = STATUS_CONFIG[candidate.status]
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-bg-gray-hover px-[20px] py-5 last:border-b-0"
                    >
                      {/* Name + Email */}
                      <div className="flex flex-1 flex-col">
                        <span className="text-body-lg font-medium text-secondary">{candidate.name}</span>
                        <span className="text-body-md text-bg-gray-dark-hover">{candidate.email}</span>
                      </div>

                      {/* Role */}
                      <span className="flex-1 text-body-md font-medium text-secondary">{candidate.role}</span>

                      {/* Date */}
                      <span className="flex-1 text-body-md font-medium text-secondary">{candidate.date}</span>

                      {/* Resume + Status grouped */}
                      <div className="flex w-[351px] items-center justify-between">
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-[8px] bg-primary-light px-4 py-3 text-body-md font-medium text-neutral-muted transition-colors hover:bg-primary-light-hover"
                        >
                          <DocumentIcon className="size-[20px]" />
                          View Resume
                        </button>
                        <div className="flex items-center gap-3">
                          <span className={`size-3 shrink-0 rounded-full ${dot}`} />
                          <span className="text-body-md font-medium text-secondary">{candidate.status}</span>
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
