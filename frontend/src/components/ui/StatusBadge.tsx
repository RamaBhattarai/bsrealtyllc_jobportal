type StatusVariant = 'Active' | 'Pending' | 'Draft'

interface StatusBadgeProps {
  status: StatusVariant
}

const config: Record<StatusVariant, { bg: string; dot: string }> = {
  Active:  { bg: 'bg-[#BAEDCD]', dot: 'bg-[#22C55E]' },
  Pending: { bg: 'bg-[#FCE1B3]', dot: 'bg-[#F59E0B]' },
  Draft:   { bg: 'bg-[#E0E1E2]', dot: 'bg-[#BBBCBC]' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { bg, dot } = config[status]

  return (
    <div className={`flex items-center gap-[4px] rounded-[12px] px-[8px] py-[8px] ${bg}`}>
      <span className={`size-[8px] shrink-0 rounded-full ${dot}`} />
      <span className="text-[12px] font-medium leading-[1.33] text-[#020617]">{status}</span>
    </div>
  )
}
