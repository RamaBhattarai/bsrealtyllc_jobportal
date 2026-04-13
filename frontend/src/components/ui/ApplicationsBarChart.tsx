import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type ViewMode = 'Daily' | 'Weekly'

interface BarDataPoint {
  label: string
  applied: number
  shortlisted: number
}

const DAILY_DATA: BarDataPoint[] = [
  { label: '13 May', applied: 120, shortlisted: 60 },
  { label: '14 May', applied: 90,  shortlisted: 40 },
  { label: '15 May', applied: 150, shortlisted: 50 },
  { label: '16 May', applied: 80,  shortlisted: 30 },
  { label: '17 May', applied: 100, shortlisted: 70 },
  { label: '18 May', applied: 60,  shortlisted: 20 },
]

const WEEKLY_DATA: BarDataPoint[] = [
  { label: 'Week 1', applied: 140, shortlisted: 55 },
  { label: 'Week 2', applied: 110, shortlisted: 45 },
  { label: 'Week 3', applied: 180, shortlisted: 80 },
  { label: 'Week 4', applied: 70,  shortlisted: 25 },
  { label: 'Week 5', applied: 130, shortlisted: 60 },
  { label: 'Week 6', applied: 95,  shortlisted: 35 },
]

interface ApplicationsBarChartProps {
  defaultView?: ViewMode
}

export function ApplicationsBarChart({ defaultView = 'Daily' }: ApplicationsBarChartProps) {
  const [view, setView] = useState<ViewMode>(defaultView)
  const data = view === 'Daily' ? DAILY_DATA : WEEKLY_DATA

  return (
    <div className="flex w-[397px] flex-col gap-[16px] rounded-xl border border-[#E6E6E6] bg-white p-[20px]">

      {/* Header — title + toggle */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-medium leading-[1.5] text-[#020617]">Applications</span>
        <div className="flex rounded-lg border border-[#E6E6E6] overflow-hidden">
          {(['Daily', 'Weekly'] as ViewMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-[12px] py-[6px] text-[12px] font-medium transition-colors ${
                view === mode
                  ? 'bg-[#4F46E5] text-white'
                  : 'bg-white text-[#575858] hover:bg-[#F7F8F9]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-[16px]">
        <div className="flex items-center gap-[6px]">
          <span className="size-[10px] rounded-full bg-[#4F46E5]" />
          <span className="text-[12px] font-medium text-[#67686A]">Applied</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="size-[10px] rounded-full bg-[#E5E3FB]" />
          <span className="text-[12px] font-medium text-[#67686A]">Shortlisted</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={208}>
        <BarChart data={data} barCategoryGap="30%" barGap={1}>
          <CartesianGrid vertical={false} stroke="#E6E6E6" strokeDasharray="" />
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
            tick={{ fontSize: 14, fontWeight: 500, fill: '#67686A' }}
            width={32}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: 8, border: '1px solid #E6E6E6', fontSize: 12 }}
          />
          <Bar dataKey="applied"     stackId="a" fill="#4F46E5" radius={[0, 0, 0, 0]} />
          <Bar dataKey="shortlisted" stackId="a" fill="#E5E3FB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
