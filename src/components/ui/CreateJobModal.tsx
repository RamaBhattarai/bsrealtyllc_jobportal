import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import {
  createJobSchema,
  type CreateJobFormValues,
  JOB_TYPES,
  JOB_TYPE_LABELS,
  DEPARTMENTS,
  EXPERIENCE_LEVELS,
  EXPERIENCE_LEVEL_LABELS,
  JOB_STATUSES,
} from '../../schemas/createJob.schema'
import type { Job } from '../../services/jobs'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface CreateJobModalProps {
  onClose: () => void
  onSubmit: (values: CreateJobFormValues) => Promise<void>
  job?: Job
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-body-sm font-medium text-slateblue-darker">{label}</label>
      {children}
      {error && <p className="text-label-md text-error">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-lightgray bg-bg-gray px-4 py-2.5 text-body-md text-secondary placeholder:text-lightgray-dark-hover outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10'

function RichEditor({
  editor: ed,
  hasError,
}: {
  editor: ReturnType<typeof useEditor>
  hasError: boolean
}) {
  return (
    <div
      className={`rounded-xl border bg-bg-gray transition focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 ${
        hasError ? 'border-error' : 'border-lightgray'
      }`}
    >
      <div className="flex items-center gap-1 border-b border-lightgray px-3 py-2">
        {[
          { label: 'B', title: 'Bold', action: () => ed?.chain().focus().toggleBold().run(), active: ed?.isActive('bold') },
          { label: 'I', title: 'Italic', action: () => ed?.chain().focus().toggleItalic().run(), active: ed?.isActive('italic') },
          { label: 'S̶', title: 'Strike', action: () => ed?.chain().focus().toggleStrike().run(), active: ed?.isActive('strike') },
          { label: 'H1', title: 'Heading 1', action: () => ed?.chain().focus().toggleHeading({ level: 1 }).run(), active: ed?.isActive('heading', { level: 1 }) },
          { label: 'H2', title: 'Heading 2', action: () => ed?.chain().focus().toggleHeading({ level: 2 }).run(), active: ed?.isActive('heading', { level: 2 }) },
          { label: '•', title: 'Bullet list', action: () => ed?.chain().focus().toggleBulletList().run(), active: ed?.isActive('bulletList') },
          { label: '1.', title: 'Ordered list', action: () => ed?.chain().focus().toggleOrderedList().run(), active: ed?.isActive('orderedList') },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            title={btn.title}
            onClick={btn.action}
            className={`rounded-md px-2.5 py-1 text-body-sm font-semibold transition-colors ${
              btn.active
                ? 'bg-primary text-white'
                : 'text-slateblue hover:bg-slateblue-light hover:text-secondary'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-3 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-lightgray-dark-hover [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_h1]:text-title-lg [&_.ProseMirror_h1]:font-semibold [&_.ProseMirror_h2]:text-title-md [&_.ProseMirror_h2]:font-semibold">
        <EditorContent editor={ed} />
      </div>
    </div>
  )
}

export function CreateJobModal({ onClose, onSubmit, job }: CreateJobModalProps) {
  const isEdit = !!job

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      status: (job?.status as CreateJobFormValues['status']) ?? 'DRAFT',
      title: job?.title ?? '',
      department: (job?.department as CreateJobFormValues['department']) ?? undefined,
      location: job?.location ?? '',
      type: (job?.type as CreateJobFormValues['type']) ?? undefined,
      experienceLevel: (job?.experienceLevel as CreateJobFormValues['experienceLevel']) ?? undefined,
      minExperienceYears: job?.minExperienceYears ?? 0,
      maxExperienceYears: job?.maxExperienceYears ?? 0,
      salaryMin: job?.salaryMin ?? 0,
      salaryMax: job?.salaryMax ?? 0,
      description: job?.description ?? '',
      requirements: job?.requirements ?? '',
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Describe the role and responsibilities...' }),
    ],
    content: job?.description ?? '',
    onUpdate({ editor }) {
      setValue('description', editor.getHTML(), { shouldValidate: true })
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[120px] text-body-md text-secondary leading-relaxed',
      },
    },
  })

  const requirementsEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'List the requirements and qualifications...' }),
    ],
    content: job?.requirements ?? '',
    onUpdate({ editor }) {
      setValue('requirements', editor.getHTML(), { shouldValidate: true })
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[100px] text-body-md text-secondary leading-relaxed',
      },
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-lightgray">
          <div>
            <h2 className="text-title-lg font-semibold text-secondary">{isEdit ? 'Edit Job' : 'Create New Job'}</h2>
            <p className="text-body-sm text-neutral-muted mt-1">{isEdit ? 'Update the job details below' : 'Fill in the details to post a new job listing'}</p>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-5">

            {/* Title + Department */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Job Title" error={errors.title?.message}>
                <input
                  className={inputCls}
                  placeholder="e.g. Senior Frontend Engineer"
                  {...register('title')}
                />
              </Field>
              <Field label="Department" error={errors.department?.message}>
                <select className={inputCls} {...register('department')}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d.charAt(0) + d.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Location + Type */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location" error={errors.location?.message}>
                <input
                  className={inputCls}
                  placeholder="e.g. Remote / New York"
                  {...register('location')}
                />
              </Field>
              <Field label="Job Type" error={errors.type?.message}>
                <select className={inputCls} {...register('type')}>
                  <option value="">Select type</option>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>{JOB_TYPE_LABELS[t]}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Experience Level + Status */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Experience Level" error={errors.experienceLevel?.message}>
                <select className={inputCls} {...register('experienceLevel')}>
                  <option value="">Select level</option>
                  {EXPERIENCE_LEVELS.map((l) => (
                    <option key={l} value={l}>{EXPERIENCE_LEVEL_LABELS[l]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Status" error={errors.status?.message}>
                <select className={inputCls} {...register('status')}>
                  {JOB_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Experience range */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Min Experience (years)" error={errors.minExperienceYears?.message}>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  placeholder="e.g. 2"
                  {...register('minExperienceYears')}
                />
              </Field>
              <Field label="Max Experience (years)" error={errors.maxExperienceYears?.message}>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  placeholder="e.g. 5"
                  {...register('maxExperienceYears')}
                />
              </Field>
            </div>

            {/* Salary range */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Min Salary" error={errors.salaryMin?.message}>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  placeholder="e.g. 50000"
                  {...register('salaryMin')}
                />
              </Field>
              <Field label="Max Salary" error={errors.salaryMax?.message}>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  placeholder="e.g. 90000"
                  {...register('salaryMax')}
                />
              </Field>
            </div>

            {/* Description */}
            <Field label="Job Description" error={errors.description?.message}>
              <Controller
                name="description"
                control={control}
                render={() => <RichEditor editor={editor} hasError={!!errors.description} />}
              />
            </Field>

            {/* Requirements */}
            <Field label="Requirements" error={errors.requirements?.message}>
              <Controller
                name="requirements"
                control={control}
                render={() => <RichEditor editor={requirementsEditor} hasError={!!errors.requirements} />}
              />
            </Field>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-lightgray">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="md" disabled={isSubmitting} leftIcon={isSubmitting ? <Spinner className="size-4" /> : undefined}>
              {isSubmitting ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create Job')}
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}
