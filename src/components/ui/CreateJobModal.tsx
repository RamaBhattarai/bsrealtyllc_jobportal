import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { createJobSchema, type CreateJobFormValues } from '../../schemas/createJob.schema'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface CreateJobModalProps {
  onClose: () => void
  onSubmit: (values: CreateJobFormValues) => Promise<void>
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'] as const

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
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
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10'

export function CreateJobModal({ onClose, onSubmit }: CreateJobModalProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobSchema),
  })

  const title = watch('title')

  useEffect(() => {
    setValue('slug', slugify(title ?? ''), { shouldValidate: false })
  }, [title, setValue])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Describe the role, responsibilities and requirements...' }),
    ],
    onUpdate({ editor }) {
      setValue('description', editor.getHTML(), { shouldValidate: true })
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[140px] text-sm text-gray-900 leading-relaxed',
      },
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
      <div className="flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh] font-sans">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create Job</h2>
            <p className="mt-0.5 text-sm text-gray-400">Fill in the details to post a new job listing</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-8" />

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">

            {/* Section: Basic */}
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Basic Information</p>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Job Title" error={errors.title?.message}>
                  <input
                    className={inputCls}
                    placeholder="e.g. Senior Frontend Developer"
                    {...register('title')}
                  />
                </Field>
                <Field label="Slug" error={errors.slug?.message}>
                  <input
                    className={inputCls}
                    placeholder="e.g. senior-frontend-developer"
                    {...register('slug')}
                  />
                </Field>
              </div>

              <Field label="Department" error={errors.department?.message}>
                <input
                  className={inputCls}
                  placeholder="e.g. Engineering"
                  {...register('department')}
                />
              </Field>
            </div>

            {/* Section: Details */}
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Job Details</p>

              <div className="grid grid-cols-3 gap-4">
                <Field label="Location" error={errors.location?.message}>
                  <input
                    className={inputCls}
                    placeholder="e.g. Remote"
                    {...register('location')}
                  />
                </Field>

                <Field label="Type" error={errors.type?.message}>
                  <select className={inputCls} {...register('type')}>
                    <option value="">Select type</option>
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Salary (Optional)">
                  <input
                    className={inputCls}
                    placeholder="e.g. $50k – $70k"
                    {...register('salary')}
                  />
                </Field>
              </div>

              <Field label="Experience Required" error={errors.experienceRange?.message}>
                <input
                  className={inputCls}
                  placeholder="e.g. 3-5 years"
                  {...register('experienceRange')}
                />
              </Field>
            </div>

            {/* Section: Description */}
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Description</p>

              <Controller
                name="description"
                control={control}
                render={() => (
                  <div className={`rounded-xl border bg-gray-50 transition focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 ${errors.description ? 'border-red-400' : 'border-gray-200'}`}>
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2">
                      {[
                        { label: 'B', title: 'Bold', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
                        { label: 'I', title: 'Italic', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
                        { label: 'S̶', title: 'Strike', action: () => editor?.chain().focus().toggleStrike().run(), active: editor?.isActive('strike') },
                        { label: 'H1', title: 'Heading 1', action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(), active: editor?.isActive('heading', { level: 1 }) },
                        { label: 'H2', title: 'Heading 2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
                        { label: '—', title: 'Divider', action: () => {}, active: false, divider: true },
                        { label: '• List', title: 'Bullet list', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
                        { label: '1. List', title: 'Ordered list', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
                      ].map((btn) =>
                        btn.divider ? (
                          <div key="divider" className="mx-1 h-4 w-px bg-gray-200" />
                        ) : (
                          <button
                            key={btn.label}
                            type="button"
                            title={btn.title}
                            onClick={btn.action}
                            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                              btn.active
                                ? 'bg-primary text-white'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                            }`}
                          >
                            {btn.label}
                          </button>
                        )
                      )}
                    </div>

                    {/* Editor area */}
                    <div className="px-4 py-3 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_h1]:text-xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:text-lg [&_.ProseMirror_h2]:font-semibold">
                      <EditorContent editor={editor} />
                    </div>
                  </div>
                )}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description.message}</p>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="h-px bg-gray-100 mx-8" />
          <div className="flex items-center justify-end gap-3 px-8 py-5">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="md" disabled={isSubmitting} leftIcon={isSubmitting ? <Spinner className="size-4" /> : undefined}>
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}
