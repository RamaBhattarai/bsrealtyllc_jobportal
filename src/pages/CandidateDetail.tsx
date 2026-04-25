import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { ScheduleInterviewModal } from '../components/ui/ScheduleInterviewModal'
import { getApplicationById, updateApplicationStatus } from '../services/applications'

const STATUS_DOT: Record<string, string> = {
  SCREENING: '#F59E0B',
  INTERVIEW: '#4F46E5',
  OFFERED:   '#3B82F6',
  HIRED:     '#22C55E',
  REJECTED:  '#F43F5E',
}

export function CandidateDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showSchedule, setShowSchedule] = useState(false)

  const { data: application, isLoading, isError } = useQuery({
    queryKey: ['applications', id],
    queryFn: () => getApplicationById(id!),
    enabled: !!id,
  })

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: () => updateApplicationStatus(id!, 'REJECTED'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications', id] }),
  })

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">

          {/* Back to Candidates */}
          <button
            type="button"
            onClick={() => navigate('/candidates')}
            className="mb-6 flex items-center gap-3 outline-none"
          >
            <span className="flex items-center justify-center rounded-full border border-[#E6E6E6] bg-[#FDFDFE] p-2">
              <ArrowLeftIcon className="size-4 text-[#020617]" />
            </span>
            <span className="text-[16px] font-medium leading-6 text-[#020617]">Back to Candidates</span>
          </button>

          {showSchedule && application && (
            <ScheduleInterviewModal
              applicationId={application.id}
              candidate={application.candidate}
              jobTitle={application.job.title}
              onClose={() => setShowSchedule(false)}
            />
          )}

          {isLoading && (
            <p className="text-[14px] text-[#707071]">Loading candidate details...</p>
          )}
          {isError && (
            <p className="text-[14px] text-[#F43F5E]">Failed to load candidate. Please try again.</p>
          )}

          {application && (
            <div className="flex w-full items-start gap-5">

              {/* ── Left column (width 811) ─────────────────── */}
              <div className="flex flex-1 flex-col gap-4">

                {/* Profile card */}
                <div className="flex items-center justify-between rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9] text-[18px] font-medium text-[#020617]">
                      {application.candidate.firstName.charAt(0)}{application.candidate.lastName.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[18px] font-medium leading-[28px] text-[#020617]">
                        {application.candidate.firstName} {application.candidate.lastName}
                      </p>
                      <p className="text-[14px] font-medium leading-[20px] text-[#575858]">
                        {application.job.title}
                      </p>
                    </div>
                  </div>
                  <a href={application.candidate.linkedinUrl || '#'} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="3" fill="#0076B2"/>
                      <path d="M7.2 9.6H4.8V19.2H7.2V9.6ZM6 8.4C6.795 8.4 7.44 7.755 7.44 6.96C7.44 6.165 6.795 5.52 6 5.52C5.205 5.52 4.56 6.165 4.56 6.96C4.56 7.755 5.205 8.4 6 8.4ZM19.44 19.2H21.84V13.68C21.84 11.088 21.264 9.36 18.288 9.36C16.86 9.36 15.9 10.14 15.504 10.884H15.468V9.6H13.2V19.2H15.6V14.124C15.6 13.008 15.816 11.928 17.196 11.928C18.564 11.928 18.576 13.2 18.576 14.196V19.2H19.44Z" fill="white"/>
                    </svg>
                  </a>
                </div>

                {/* Personal Information */}
                <div className="flex flex-col rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <p className="mb-3 text-[16px] font-medium leading-6 text-[#020617]">Personal Informations</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="size-5 shrink-0 text-[#575858]" />
                      <span className="text-[14px] font-normal leading-5 text-[#020617]">
                        {application.candidate.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="size-5 shrink-0 text-[#575858]" />
                      <span className="text-[14px] font-normal leading-5 text-[#020617]">
                        {application.candidate.phone || '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="size-5 shrink-0 text-[#575858]" />
                      <span className="text-[14px] font-normal leading-5 text-[#020617]">
                        {application.candidate.location || '—'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <p className="text-[16px] font-medium leading-6 text-[#020617]">Experience</p>
                  {(() => {
                    const raw = application.candidate.experience
                    if (!raw || (Array.isArray(raw) && raw.length === 0)) {
                      return <p className="text-[14px] font-normal leading-5 text-[#707071]">No experience data available.</p>
                    }
                    const exp: { company: string; role: string }[] = Array.isArray(raw)
                      ? raw
                      : (() => { try { return JSON.parse(raw as string) } catch { return [] } })()
                    if (exp.length === 0) {
                      return <p className="text-[14px] font-normal leading-5 text-[#707071]">{raw as string}</p>
                    }
                    return (
                      <div className="flex flex-col gap-3">
                        {exp.map((e, i) => (
                          <div key={i} className="flex flex-col gap-0.5">
                            <span className="text-[14px] font-medium leading-5 text-[#020617]">{e.role}</span>
                            <span className="text-[13px] font-normal leading-5 text-[#707071]">{e.company}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>

                {/* Skills */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <p className="text-[16px] font-medium leading-6 text-[#020617]">Skills</p>
                  {(() => {
                    const raw = application.candidate.skills
                    if (!raw || (Array.isArray(raw) && raw.length === 0)) {
                      return <p className="text-[14px] font-normal leading-5 text-[#707071]">No skills data available.</p>
                    }
                    const skills: string[] = Array.isArray(raw)
                      ? raw
                      : (raw as string).split(',').map((s) => s.trim()).filter(Boolean)
                    return (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="inline-flex items-center justify-center rounded-lg bg-[#EDEDFC] px-2 py-1 text-[12px] font-medium leading-4 text-[#707071]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )
                  })()}
                </div>

              </div>

              {/* ── Right column (width 334) ─────────────────── */}
              <div className="flex w-[334px] shrink-0 flex-col gap-4">

                {/* Candidate Status + Applied Job */}
                <div className="flex flex-col rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  {/* Status section */}
                  <div className="flex flex-col gap-3 border-b border-[#E6E6E6] pb-3">
                    <p className="text-[16px] font-medium leading-6 text-[#020617]">Candidate Status</p>
                    <div className="flex items-center gap-2 py-1">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: STATUS_DOT[application.status] ?? '#BBBCBC' }}
                      />
                      <span className="text-[14px] font-medium leading-5 text-[#020617]">
                        {application.status.charAt(0) + application.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </div>
                  {/* Applied Job section */}
                  <div className="flex flex-col gap-2 pt-3">
                    <p className="text-[16px] font-medium leading-6 text-[#020617]">Applied Job</p>
                    <p className="text-[14px] font-medium leading-[20px] text-[#505152]">
                      {application.job.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center rounded-lg bg-[#EDEDFC] px-2 py-1 text-[12px] font-medium leading-4 text-[#707071]">
                        Full-time
                      </span>
                      <span className="inline-flex items-center justify-center rounded-lg bg-[#EDEDFC] px-2 py-1 text-[12px] font-medium leading-4 text-[#707071]">
                        Remote
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Interviews */}
                <div className="flex flex-col gap-3 rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <p className="text-[16px] font-medium leading-6 text-[#020617]">Upcoming Interviews</p>
                  <div className="flex flex-col gap-3 rounded-lg bg-[#F7F8F9] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="size-5 text-[#575858]" />
                        <span className="text-[14px] font-medium leading-5 text-[#575858]">No date scheduled</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-5 text-[#575858]" />
                        <span className="text-[14px] font-medium leading-5 text-[#575858]">—</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-medium leading-4 text-[#707071]">No interviews scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action */}
                <div className="flex flex-col gap-[18px] rounded-xl border border-[#E6E6E6] bg-white px-6 py-4">
                  <p className="text-[16px] font-medium leading-6 text-[#020617]">Quick Action</p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSchedule(true)}
                      className="flex w-full items-center gap-2 rounded-lg bg-[#F7F8F9] p-3 text-[14px] font-medium leading-5 text-[#020617] transition hover:bg-[#E0E1E2]"
                    >
                      <PlusIcon className="size-4 shrink-0 text-[#4F46E5]" />
                      Schedule Interview
                    </button>
                    <button
                      type="button"
                      disabled={isRejecting || application.status === 'REJECTED'}
                      onClick={() => reject()}
                      className="flex w-full items-center gap-2 rounded-lg bg-[#FEECEF] p-3 text-[14px] font-medium leading-5 text-[#F43F5E] transition hover:bg-[#fdd8de] disabled:opacity-50"
                    >
                      <XMarkIcon className="size-4 shrink-0 text-[#F43F5E]" />
                      {isRejecting ? 'Rejecting...' : application.status === 'REJECTED' ? 'Rejected' : 'Reject Candidate'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
