import { EllipsisHorizontalIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface KPICardProps {
  label: string
  value: string | number
  trend: number
  trendDirection: 'up' | 'down'
}

export function KPICard({ label, value, trend, trendDirection }: KPICardProps) {
  const isUp = trendDirection === 'up'

  return (
    <div className="flex w-[212px] flex-col gap-[12px] rounded-xl border border-[#E6E6E6] bg-white p-[16px]">

      {/* Header row — label + 3-dots */}
      <div className="flex items-center justify-between gap-[50px]">
        <span className="text-[14px] font-medium leading-[1.43] text-[#4B5768]">
          {label}
        </span>
        <EllipsisHorizontalIcon className="size-[16px] shrink-0 text-[#4B5768]" />
      </div>

      {/* Value + trend badge */}
      <div className="flex items-center justify-between">
        <span className="text-[32px] font-semibold leading-[1.25] text-[#0E0E10]">
          {value}
        </span>

        <div className={`flex items-center gap-[4px] rounded-lg p-[4px] ${isUp ? 'bg-[#E9F9EF]' : 'bg-[#FEECEF]'}`}>
          <span className={`text-[12px] font-medium leading-[1.33] ${isUp ? 'text-[#46BF4B]' : 'text-[#F43F5E]'}`}>
            {trend}%
          </span>
          {isUp
            ? <ArrowUpIcon className="size-[12px] text-[#46BF4B]" />
            : <ArrowDownIcon className="size-[12px] text-[#F43F5E]" />
          }
        </div>
      </div>

    </div>
  )
}
