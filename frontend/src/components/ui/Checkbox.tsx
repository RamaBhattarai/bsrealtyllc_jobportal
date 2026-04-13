import { CheckIcon } from '@heroicons/react/24/solid'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
}

export function Checkbox({ checked = false, onChange, disabled = false, label, id }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-[8px] ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="relative flex size-[16px] shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-label={label ?? 'Checkbox'}
          onChange={e => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`flex size-[16px] items-center justify-center rounded-sm border transition-colors ${
            checked ? 'border-[#E6E6E6] bg-[#A5B4FC]' : 'border-[#E6E6E6] bg-white'
          }`}
        >
          {checked && <CheckIcon className="size-[12px] text-white" />}
        </div>
      </div>
      {label && (
        <span className="text-[14px] font-medium leading-[1.43] text-[#020617]">{label}</span>
      )}
    </label>
  )
}
