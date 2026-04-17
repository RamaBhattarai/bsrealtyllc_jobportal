interface ToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export function Toggle({ checked = false, onChange, disabled = false, label = 'Toggle' }: ToggleProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`flex h-[24px] w-[44px] shrink-0 items-center rounded-xl p-[4px] transition-colors duration-200 ${
          checked ? 'justify-end bg-[#4F46E5] px-[4px] py-[2px]' : 'justify-start bg-[#C7C8C9]'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <span className="block size-[16px] rounded-full bg-white shadow-[2px_1px_6px_0px_rgba(0,0,0,0.07)]" />
      </div>
    </label>
  )
}
