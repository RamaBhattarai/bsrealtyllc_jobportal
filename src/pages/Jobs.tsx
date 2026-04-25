import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { JobListCard } from '../components/ui/JobListCard'
import { CreateJobModal } from '../components/ui/CreateJobModal'
import { getJobs, createJob } from '../services/jobs'
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import type { CreateJobFormValues } from '../schemas/createJob.schema'

type FilterTab = 'All' | 'Active' | 'Draft' | 'Pending' | 'Closed'

function deriveLevel(minYears: number): string {
  if (minYears <= 1) return 'Entry-level'
  if (minYears <= 4) return 'Mid-level'
  if (minYears <= 8) return 'Senior'
  return 'Lead'
}

const FILTER_TABS: FilterTab[] = ['All', 'Active', 'Draft', 'Pending', 'Closed']

export function JobsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })

  async function handleCreateJob(values: CreateJobFormValues) {
    await createJob(values)
    await queryClient.invalidateQueries({ queryKey: ['jobs'] })
    setShowModal(false)
  }

  const filtered = activeFilter === 'All'
    ? jobs
    : jobs.filter((j) => j.status === activeFilter)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-gray">
      {showModal && (
        <CreateJobModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateJob}
        />
      )}
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">

          {/* Filter + Actions bar */}
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

            {/* Right actions */}
            <div className="flex items-center gap-5">
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

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex h-8 items-center gap-2 rounded-[12px] bg-primary px-4 py-3 transition-colors hover:bg-primary-active"
              >
                <PlusIcon className="size-5 text-primary-light" />
                <span className="text-body-md font-medium text-primary-light">Create Job</span>
              </button>
            </div>
          </div>

          {/* Job cards grid */}
          <div className="mt-6 flex flex-wrap gap-5">
            {isLoading ? (
              <p className="w-full py-8 text-center text-body-md text-neutral-muted">Loading jobs...</p>
            ) : filtered.length === 0 ? (
              <p className="w-full py-8 text-center text-body-md text-neutral-muted">No jobs found.</p>
            ) : (
              filtered.map((job) => (
                <div key={job.id} className="cursor-pointer" onClick={() => navigate(`/jobs/${job.slug}`)}>
                  <JobListCard
                    title={job.title}
                    department={job.department}
                    status={job.status}
                    level={deriveLevel(job.minExperienceYears)}
                    experienceRange={`${job.minExperienceYears}–${job.maxExperienceYears}`}
                  />
                </div>
              ))
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
