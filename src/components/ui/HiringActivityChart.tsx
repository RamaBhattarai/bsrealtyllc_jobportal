import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

// Bar heights taken from Figma pixel values, scaled to 200-unit Y axis (168px = 200u)
const CHART_DATA = [
  { label: '13 May', applications: 70,  inProcess: 23 },
  { label: '14 May', applications: 86,  inProcess: 11 },
  { label: '15 May', applications: 5,   inProcess: 3  },
  { label: '16 May', applications: 33,  inProcess: 33 },
  { label: '17 May', applications: 150, inProcess: 51 },
  { label: '18 May', applications: 4,   inProcess: 4  },
]

export function HiringActivityChart() {
  return (
    <div className="flex flex-1 flex-col gap-[16px] rounded-[12px] border border-[#E6E6E6] bg-white p-[20px]">

      {/* Frame 81 — column gap-8: title row + legend row */}
      <div className="flex flex-col gap-[8px]">

        {/* Title + date range button */}
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-medium leading-[1.556] text-[#000000]">
            Hiring Activity
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

        {/* Legend */}
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[4px]">
            <span className="inline-block h-[14px] w-[14px] rounded-[2px] bg-[#4F46E5]" />
            <span className="text-[14px] font-medium leading-[1.429] text-[#707071]">Applications</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="inline-block h-[14px] w-[14px] rounded-[2px] bg-[#D9DADC]" />
            <span className="text-[14px] font-medium leading-[1.429] text-[#707071]">In Process</span>
          </div>
        </div>

      </div>

      {/* Bar chart — white background */}
      <ResponsiveContainer width="100%" height={208}>
        <BarChart
          data={CHART_DATA}
          barCategoryGap="30%"
          barGap={3}
          margin={{ top: 12, right: 8, bottom: 4, left: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#E6E6E6"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#67686A' }}
          />
          <YAxis
            domain={[0, 200]}
            ticks={[0, 50, 100, 150, 200]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fontWeight: 500, fill: '#67686A' }}
            width={30}
          />
          <Bar dataKey="applications" fill="#4F46E5" radius={[3, 3, 0, 0]} maxBarSize={26} />
          <Bar dataKey="inProcess"    fill="#D9DADC" radius={[3, 3, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
