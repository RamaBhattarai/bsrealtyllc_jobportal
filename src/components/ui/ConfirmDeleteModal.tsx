import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'
import { Spinner } from './Spinner'

interface ConfirmDeleteModalProps {
  title: string
  description?: string
  isDeleting?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDeleteModal({
  title,
  description,
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Icon + Text */}
        <div className="flex flex-col items-center gap-4 px-8 pt-8 pb-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#FEECEF]">
            <TrashIcon className="size-7 text-[#F43F5E]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-title-lg font-semibold text-secondary">Delete Job</h2>
            <p className="text-body-md text-neutral-muted">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-secondary">"{title}"</span>?
              {description && <><br />{description}</>}
            </p>
            <p className="text-body-sm text-[#F43F5E]">This action cannot be undone.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-lightgray px-8 py-5">
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F43F5E] px-5 py-4 text-base font-medium text-white transition hover:bg-[#e11d48] disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Spinner className="size-4" />
                Deleting...
              </>
            ) : (
              <>
                <TrashIcon className="size-[18px]" />
                Delete Job
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
