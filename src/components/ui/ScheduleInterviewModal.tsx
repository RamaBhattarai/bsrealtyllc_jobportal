import { useState } from 'react'
import { XMarkIcon, CalendarIcon, ClockIcon, MapPinIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInterview, updateInterview, INTERVIEW_TYPES, INTERVIEW_STATUSES } from '../../services/interviews'
import type { Interview } from '../../services/interviews'
import type { Candidate } from '../../services/applications'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface ScheduleInterviewModalProps {
  applicationId: string
  candidate: Candidate
  jobTitle: string
  onClose: () => void
  interview?: Interview
}

const INTERVIEW_TYPE_LABELS: Record<typeof INTERVIEW_TYPES[number], string> = {
  TECHNICAL: 'Technical',
  HR: 'HR',
  CULTURAL: 'Cultural Fit',
  FINAL: 'Final Round',
}

const INTERVIEW_STATUS_LABELS: Record<typeof INTERVIEW_STATUSES[number], string> = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show',
}

const inputCls =
  'w-full rounded-xl border border-lightgray bg-bg-gray px-4 py-2.5 text-body-md text-secondary placeholder:text-lightgray-dark-hover outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10'

function toDateInput(iso?: string) {
  if (!iso) return ''
  return iso.slice(0, 10)
}

function toTimeInput(iso?: string) {
  if (!iso) return ''
  return iso.slice(11, 16)
}

export function ScheduleInterviewModal({
  applicationId,
  candidate,
  jobTitle,
  onClose,
  interview,
}: ScheduleInterviewModalProps) {
  const queryClient = useQueryClient()
  const isEdit = !!interview

  const [date, setDate] = useState(toDateInput(interview?.scheduledAt))
  const [time, setTime] = useState(toTimeInput(interview?.scheduledAt))
  const [durationMins, setDurationMins] = useState(interview?.durationMins ?? 60)
  const [type, setType] = useState<typeof INTERVIEW_TYPES[number]>(
    (interview?.type as typeof INTERVIEW_TYPES[number]) ?? 'TECHNICAL'
  )
  const [status, setStatus] = useState<typeof INTERVIEW_STATUSES[number]>(
    (interview?.status as typeof INTERVIEW_STATUSES[number]) ?? 'SCHEDULED'
  )
  const [mode, setMode] = useState<'in-person' | 'remote'>(
    interview?.location ? 'in-person' : 'remote'
  )
  const [location, setLocation] = useState(interview?.location ?? '')
  const [videoUrl, setVideoUrl] = useState(interview?.videoConferenceUrl ?? '')
  const [notes, setNotes] = useState(interview?.notes ?? '')

  const createMutation = useMutation({
    mutationFn: createInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] })
      onClose()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof updateInterview>[1] }) =>
      updateInterview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] })
      onClose()
    },
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const scheduledAt = new Date(`${date}T${time}`).toISOString()

    if (isEdit && interview) {
      updateMutation.mutate({
        id: interview.id,
        payload: {
          scheduledAt,
          durationMins,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          type,
          status,
          location: mode === 'in-person' ? location : undefined,
          videoConferenceUrl: mode === 'remote' ? videoUrl : undefined,
          notes: notes || undefined,
        },
      })
    } else {
      createMutation.mutate({
        applicationId,
        scheduledAt,
        durationMins,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        type,
        location: mode === 'in-person' ? location : undefined,
        videoConferenceUrl: mode === 'remote' ? videoUrl : undefined,
        notes: notes || undefined,
        attendees: [
          {
            email: candidate.email,
            name: `${candidate.firstName} ${candidate.lastName}`,
            role: 'Candidate',
            isCandidate: true,
          },
        ],
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-lightgray px-6 py-5">
          <div>
            <h2 className="text-title-lg font-semibold text-secondary">
              {isEdit ? 'Edit Interview' : 'Schedule Interview'}
            </h2>
            <p className="mt-0.5 text-body-sm text-neutral-muted">
              {candidate.firstName} {candidate.lastName} — {jobTitle}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-muted transition hover:bg-slateblue-light hover:text-secondary"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">

            {/* Interview Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-slateblue-darker">Interview Type</label>
              <div className="flex gap-2 flex-wrap">
                {INTERVIEW_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`rounded-lg px-3 py-2 text-body-sm font-medium transition ${
                      type === t
                        ? 'bg-primary text-white'
                        : 'bg-bg-gray text-secondary hover:bg-slateblue-light'
                    }`}
                  >
                    {INTERVIEW_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-body-sm font-medium text-slateblue-darker">
                  <span className="flex items-center gap-1.5"><CalendarIcon className="size-4" />Date</span>
                </label>
                <input
                  type="date"
                  required
                  aria-label="Interview date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-body-sm font-medium text-slateblue-darker">
                  <span className="flex items-center gap-1.5"><ClockIcon className="size-4" />Time</span>
                </label>
                <input
                  type="time"
                  required
                  aria-label="Interview time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-slateblue-darker">Duration (minutes)</label>
              <select
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className={inputCls}
                aria-label="Duration"
              >
                {[30, 45, 60, 90, 120].map((d) => (
                  <option key={d} value={d}>{d} min</option>
                ))}
              </select>
            </div>

            {/* Status — edit mode only */}
            {isEdit && (
              <div className="flex flex-col gap-1.5">
                <label className="text-body-sm font-medium text-slateblue-darker">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {INTERVIEW_STATUSES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className={`rounded-lg px-3 py-2 text-body-sm font-medium transition ${
                        status === s
                          ? 'bg-primary text-white'
                          : 'bg-bg-gray text-secondary hover:bg-slateblue-light'
                      }`}
                    >
                      {INTERVIEW_STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-slateblue-darker">Format</label>
              <div className="flex rounded-xl border border-lightgray overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMode('remote')}
                  className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-body-sm font-medium transition ${
                    mode === 'remote' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-bg-gray'
                  }`}
                >
                  <VideoCameraIcon className="size-4" />
                  Remote
                </button>
                <button
                  type="button"
                  onClick={() => setMode('in-person')}
                  className={`flex flex-1 items-center justify-center gap-2 py-2.5 text-body-sm font-medium transition ${
                    mode === 'in-person' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-bg-gray'
                  }`}
                >
                  <MapPinIcon className="size-4" />
                  In-person
                </button>
              </div>
            </div>

            {/* Location or Video URL */}
            {mode === 'remote' ? (
              <div className="flex flex-col gap-1.5">
                <label className="text-body-sm font-medium text-slateblue-darker">Video Conference URL</label>
                <input
                  type="url"
                  placeholder="e.g. https://meet.google.com/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className={inputCls}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-body-sm font-medium text-slateblue-darker">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Office - Meeting Room 2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputCls}
                />
              </div>
            )}

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-slateblue-darker">Notes</label>
              <textarea
                rows={3}
                placeholder="Any preparation notes or instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Attendee preview */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-sm font-medium text-slateblue-darker">Attendees</label>
              <div className="flex items-center gap-3 rounded-xl border border-lightgray bg-bg-gray px-4 py-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-body-sm font-semibold text-white">
                  {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                </div>
                <div>
                  <p className="text-body-sm font-medium text-secondary">
                    {candidate.firstName} {candidate.lastName}
                  </p>
                  <p className="text-label-md text-neutral-muted">{candidate.email}</p>
                </div>
                <span className="ml-auto rounded-lg bg-primary-light px-2 py-1 text-label-md font-medium text-primary">
                  Candidate
                </span>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-lightgray px-6 py-4">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="md"
              disabled={isPending || !date || !time}
              leftIcon={isPending ? <Spinner className="size-4" /> : undefined}
            >
              {isPending
                ? (isEdit ? 'Saving...' : 'Scheduling...')
                : (isEdit ? 'Save Changes' : 'Schedule Interview')}
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}
