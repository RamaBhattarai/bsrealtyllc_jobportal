import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { JobListCard } from '../components/ui/JobListCard'
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

type JobStatus = 'Active' | 'Draft' | 'Pending'
type FilterTab = 'All' | JobStatus

const FILTER_TABS: FilterTab[] = ['All', 'Active', 'Draft', 'Pending']

interface Job {
  title: string
  department: string
  status: JobStatus
  level: string
  experienceRange: string
  tags: string[]
  applicantCount: number
}

const JOBS: Job[] = [
  { title: 'Software Developer',  department: 'Engineering',  status: 'Active',   level: 'Senior',      experienceRange: '3-5',  tags: ['Full-time', 'Remote'],  applicantCount: 120 },
  { title: 'Graphic Designer',    department: 'Design',       status: 'Active',   level: 'Mid-level',   experienceRange: '2-4',  tags: ['Full-time', 'Remote'],  applicantCount: 70  },
  { title: 'Marketing Manager',   department: 'Marketing',    status: 'Pending',  level: 'Senior',      experienceRange: '5-7',  tags: ['Full-time', 'On-site'], applicantCount: 45  },
  { title: 'UI/UX Designer',      department: 'Design',       status: 'Active',   level: 'Mid-level',   experienceRange: '2-4',  tags: ['Part-time', 'Remote'],  applicantCount: 95  },
  { title: 'Product Manager',     department: 'Product',      status: 'Draft',    level: 'Senior',      experienceRange: '4-6',  tags: ['Full-time', 'Hybrid'],  applicantCount: 60  },
  { title: 'Data Analyst',        department: 'Analytics',    status: 'Active',   level: 'Junior',      experienceRange: '1-3',  tags: ['Full-time', 'Remote'],  applicantCount: 88  },
  { title: 'Customer Support',    department: 'Operations',   status: 'Pending',  level: 'Junior',      experienceRange: '0-2',  tags: ['Full-time', 'On-site'], applicantCount: 33  },
  { title: 'DevOps Engineer',     department: 'Engineering',  status: 'Draft',    level: 'Senior',      experienceRange: '4-6',  tags: ['Full-time', 'Remote'],  applicantCount: 20  },
]

export function JobsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')

  const filtered = activeFilter === 'All'
    ? JOBS
    : JOBS.filter((j) => j.status === activeFilter)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-gray">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">

          {/* ── Filter + Actions bar (Figma: 362:1919) ───────────── */}
          <div className="flex items-center justify-between py-0">

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

            {/* Right actions: Sort by + Create Job */}
            <div className="flex items-center gap-5">
              {/* Sort by */}
              <div className="flex items-center gap-3">
                <span className="text-body-lg font-medium text-gray-700">Sort by:</span>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-[8px] border border-light-gray bg-white px-3 py-2 text-body-md font-medium text-lightgray-darker hover:bg-bg-gray"
                >
                  Last Updated
                  <ChevronDownIcon className="size-4" />
                </button>
              </div>

              {/* Create Job */}
              <button
                type="button"
                className="flex h-8 items-center gap-2 rounded-[12px] bg-primary px-4 py-3 transition-colors hover:bg-primary-active"
              >
                <PlusIcon className="size-5 text-primary-light" />
                <span className="text-body-md font-medium text-primary-light">Create Job</span>
              </button>
            </div>
          </div>

          {/* ── Job cards grid ───────────────────────────────────── */}
          <div className="mt-6 flex flex-wrap gap-5">
            {filtered.length === 0 ? (
              <p className="w-full py-8 text-center text-body-md text-neutral-muted">No jobs found.</p>
            ) : (
              filtered.map((job, idx) => (
                <JobListCard
                  key={idx}
                  title={job.title}
                  department={job.department}
                  status={job.status === 'Draft' ? 'Draft' : job.status === 'Pending' ? 'Pending' : 'Active'}
                  level={job.level}
                  experienceRange={job.experienceRange}
                  tags={job.tags}
                  applicantCount={job.applicantCount}
                />
              ))
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
