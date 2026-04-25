import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeftIcon, MapPinIcon, BriefcaseIcon, ChartBarIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { StatusBadge } from '../components/ui/StatusBadge'
import { CreateJobModal } from '../components/ui/CreateJobModal'
import { ConfirmDeleteModal } from '../components/ui/ConfirmDeleteModal'
import { getJobById, updateJob, deleteJob } from '../services/jobs'
import type { CreateJobFormValues } from '../schemas/createJob.schema'

function deriveLevel(minYears: number): string {
  if (minYears <= 1) return 'Entry-level'
  if (minYears <= 4) return 'Mid-level'
  if (minYears <= 8) return 'Senior'
  return 'Lead'
}

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-lightgray bg-bg-gray px-4 py-2.5">
      <span className="text-slateblue">{icon}</span>
      <span className="text-body-md font-medium text-secondary">{label}</span>
    </div>
  )
}

export function JobDetailPage() {
  const { id: slug } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['jobs', slug],
    queryFn: () => getJobById(slug!),
    enabled: !!slug,
  })

  async function handleEditJob(values: CreateJobFormValues) {
    if (!job) return
    await updateJob(job.id, values)
    await queryClient.invalidateQueries({ queryKey: ['jobs', slug] })
    setShowEdit(false)
  }

  async function handleDelete() {
    if (!job) return
    setIsDeleting(true)
    try {
      await deleteJob(job.id)
      await queryClient.invalidateQueries({ queryKey: ['jobs'] })
      navigate('/jobs')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-gray">
      {showEdit && job && (
        <CreateJobModal
          job={job}
          onClose={() => setShowEdit(false)}
          onSubmit={handleEditJob}
        />
      )}
      {showDeleteConfirm && job && (
        <ConfirmDeleteModal
          title={job.title}
          isDeleting={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="mb-5 flex items-center gap-2 text-body-md font-medium text-slateblue transition hover:text-secondary"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Jobs
          </button>

          {isLoading && (
            <p className="text-body-md text-neutral-muted">Loading job details...</p>
          )}

          {isError && (
            <p className="text-body-md text-error">Failed to load job. Please try again.</p>
          )}

          {job && (
            <div className="mx-auto max-w-3xl flex flex-col gap-6">

              {/* Header card */}
              <div className="rounded-2xl border border-lightgray bg-white p-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary-light">
                    <svg viewBox="0 0 24 24" fill="none" className="size-6 text-primary">
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-title-lg font-semibold text-secondary">{job.title}</h1>
                    <p className="text-body-md text-neutral-muted mt-0.5">{job.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={job.status} />
                  <button
                    type="button"
                    onClick={() => setShowEdit(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-lightgray bg-white px-3 py-2 text-[14px] font-medium text-[#4F46E5] transition hover:bg-[#EDEDFC]"
                  >
                    <PencilSquareIcon className="size-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 rounded-lg border border-[#FEECEF] bg-[#FEECEF] px-3 py-2 text-[14px] font-medium text-[#F43F5E] transition hover:bg-[#fdd8de] disabled:opacity-50"
                  >
                    <TrashIcon className="size-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>

              {/* Info chips */}
              <div className="flex flex-wrap gap-3">
                <InfoChip icon={<MapPinIcon className="size-4" />} label={job.location} />
                <InfoChip icon={<BriefcaseIcon className="size-4" />} label={job.type} />
                <InfoChip
                  icon={<ChartBarIcon className="size-4" />}
                  label={deriveLevel(job.minExperienceYears)}
                />
                <InfoChip
                  icon={<BriefcaseIcon className="size-4" />}
                  label={`${job.minExperienceYears}–${job.maxExperienceYears} yrs experience`}
                />
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-lightgray bg-white p-6">
                <h2 className="text-title-md font-semibold text-secondary mb-4">Job Description</h2>
                <div
                  className="text-body-md text-slateblue-darker leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:text-title-lg [&_h1]:font-semibold [&_h2]:text-title-md [&_h2]:font-semibold [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="rounded-2xl border border-lightgray bg-white p-6">
                  <h2 className="text-title-md font-semibold text-secondary mb-4">Requirements</h2>
                  <div
                    className="text-body-md text-slateblue-darker leading-relaxed prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:text-title-lg [&_h1]:font-semibold [&_h2]:text-title-md [&_h2]:font-semibold [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                  />
                </div>
              )}

            </div>
          )}

        </main>
      </div>
    </div>
  )
}
