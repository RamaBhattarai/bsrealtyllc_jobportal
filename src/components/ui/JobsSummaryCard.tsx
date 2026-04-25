import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const SEGMENT_META = [
  { label: 'Active',  color: '#F6F8FF' },
  { label: 'Draft',   color: '#A5B4FC' },
  { label: 'On Hold', color: '#7C87BD' },
  { label: 'Closed',  color: '#3A3F58' },
]

interface Segment { label: string; color: string; value: number }

const r = 60
const cx = 80
const cy = 80
const circumference = 2 * Math.PI * r

function DonutChart({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)
  let cumulative = 0
  return (
    <div className="relative flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {segments.map((seg) => {
          const dash = total > 0 ? (seg.value / total) * circumference : 0
          const dashOffset = -cumulative
          cumulative += dash
          return (
            <circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={24}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 80 80)"
            />
          )
        })}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[18px] font-medium leading-[1.556] text-[#707071]">{total}</span>
        <span className="text-[14px] font-medium leading-[1.43] text-[#575858]">Total Jobs</span>
      </div>
    </div>
  )
}

interface JobsSummaryCardProps {
  active?: number
  draft?: number
  onHold?: number
  closed?: number
}

export function JobsSummaryCard({ active = 5, draft = 10, onHold = 4, closed = 5 }: JobsSummaryCardProps) {
  const segments: Segment[] = [
    { ...SEGMENT_META[0], value: active },
    { ...SEGMENT_META[1], value: draft },
    { ...SEGMENT_META[2], value: onHold },
    { ...SEGMENT_META[3], value: closed },
  ]

  const rows = [
    [segments[0], segments[1]],
    [segments[2], segments[3]],
  ]

  return (
    <div className="flex h-[352px] w-full flex-col items-center gap-[9px] rounded-[12px] bg-[#EDEDFC] px-[16px] py-[20px]">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <span className="text-[18px] font-medium leading-[1.556] text-[#000000]">Jobs Summary</span>
        <EllipsisHorizontalIcon className="size-[16px] shrink-0 text-[#4B5768]" />
      </div>

      {/* Donut chart */}
      <DonutChart segments={segments} />

      {/* Legend */}
      <div className="flex w-full flex-col gap-[16px]">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-center justify-between gap-[20px]">
            {row.map((seg) => (
              <div key={seg.label} className="flex items-center gap-[4px]">
                <div
                  className="h-[33px] w-[6px] rounded-[4px]"
                  style={{ backgroundColor: seg.color }}
                />
                <div className="flex items-center gap-[2px]">
                  <span className="text-[18px] font-medium leading-[1.556] text-[#020617]">
                    {String(seg.value).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-medium leading-[1.43] text-[#505152]">
                    {seg.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
