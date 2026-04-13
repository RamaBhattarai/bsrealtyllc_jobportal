import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const roles = [
  { label: 'Software Developer', value: 120, color: '#4F46E5' },
  { label: 'UI/UX Designer',     value: 100, color: '#C8C6F7' },
  { label: 'Marketing',          value: 95,  color: '#E5E3FB' },
  { label: 'Customer Support',   value: 85,  color: '#EDEDFC' },
]

const total = roles.reduce((s, r) => s + r.value, 0)

export function ApplicationsByRoleChart() {
  return (
    <div className="flex flex-1 flex-col gap-[24px] rounded-[12px] border border-[#E6E6E6] bg-white p-[20px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-medium leading-[1.556] text-[#000000]">
          Applications by Role
        </span>
        <button
          type="button"
          className="flex items-center gap-[4px] rounded-[8px] border border-[#E6E6E6] bg-white px-[12px] py-[8px]"
        >
          <CalendarIcon className="size-[14px] text-[#020617]" />
          <span className="text-[12px] font-medium leading-[1.333] text-[#020617]">
            13 - 18 May
          </span>
          <ChevronDownIcon className="size-[12px] text-[#020617]" />
        </button>
      </div>

      {/* Donut + legend row */}
      <div className="flex items-center gap-[16px]">

        {/* Frame 84 — donut above, text below, column gap-12 */}
        <div className="flex shrink-0 flex-col items-center gap-[12px]">
          {/* Donut — 162×162px */}
          <div style={{ width: 162, height: 162 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roles}
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={80}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  {roles.map((r) => (
                    <Cell key={r.label} fill={r.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Frame 83 — text below donut, centered */}
          <div className="flex flex-col items-center">
            <span className="text-[22px] font-bold leading-[1.273] text-[#3C4653]">{total}</span>
            <span className="text-[14px] font-medium leading-[1.429] text-[#707071]">Total Applications</span>
          </div>
        </div>

        {/* Legend — column gap-12, each row justify-between */}
        <div className="flex flex-1 flex-col gap-[12px]">
          {roles.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <span
                  className="inline-block h-[18px] w-[18px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: r.color }}
                />
                <span className="text-[14px] font-medium leading-[1.429] text-[#707071]">{r.label}</span>
              </div>
              <span className="text-[14px] font-semibold leading-[1.429] text-[#575858]">{r.value}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

