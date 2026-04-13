import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { KPICard } from '../components/ui/KPICard'
import { JobsSummaryCard } from '../components/ui/JobsSummaryCard'
import { HiringActivityChart } from '../components/ui/HiringActivityChart'
import { ApplicationsByRoleChart } from '../components/ui/ApplicationsByRoleChart'
import { QuickInsightCard } from '../components/ui/QuickInsightCard'
import { JobCard } from '../components/ui/JobCard'
import { InterviewScheduleCard } from '../components/ui/InterviewScheduleCard'
import { PlusIcon } from '@heroicons/react/24/outline'

const VACANCIES = [
  { title: 'Software Developer', tags: ['Full-time', 'Remote'],   applicantCount: 120 },
  { title: 'Graphic Designer',   tags: ['Full-time', 'Remote'],   applicantCount: 70  },
  { title: 'Marketing Manager',  tags: ['Full-time', 'On-site'],  applicantCount: 45  },
  { title: 'UI/UX Designer',     tags: ['Part-time', 'Remote'],   applicantCount: 95  },
]

export function DashboardPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar />

      {/* ── Main area ─────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-[24px]">

          {/* ── Page header ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[4px]">
              <h1 className="text-[22px] font-bold leading-[1.273] text-[#020617]">Dashboard</h1>
              <p className="text-[14px] font-normal leading-[1.43] text-[#707071]">
                Track job postings, review candidates, and manage interviews.
              </p>
            </div>

            {/* Create Job button */}
            <button
              type="button"
              className="flex h-[40px] items-center gap-[4px] rounded-[12px] bg-[#4F46E5] px-[12px] py-[8px] transition-colors hover:bg-[#3F38B7]"
            >
              <PlusIcon className="size-[16px] text-[#EDEDFC]" />
              <span className="text-[14px] font-medium leading-[1.43] text-[#EDEDFC]">Create Job</span>
            </button>
          </div>

          {/* ── Two-column content ────────────────────────────────── */}
          <div className="mt-[24px] flex gap-[16px]">

            {/* Left column — KPI cards + charts */}
            <div className="flex flex-1 flex-col gap-[16px]">
              {/* KPI cards row */}
              <div className="flex gap-[16px]">
                <KPICard label="Applications" value="400" trend={25} trendDirection="up" />
                <KPICard label="In Process"   value="120" trend={25} trendDirection="down" />
                <KPICard label="Hired"        value="156" trend={25} trendDirection="up" />
                <KPICard label="Rejected"     value="100" trend={25} trendDirection="down" />
              </div>
              {/* Charts row — Hiring Activity + Applications by Role */}
              <div className="flex gap-[16px]">
                <HiringActivityChart />
                <ApplicationsByRoleChart />
              </div>

              {/* Current Vacancies section */}
              <div className="flex flex-col gap-[16px]">
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[18px] font-medium leading-[1.333] text-[#000000]">Current Vacancies</span>
                    <span className="text-[16px] font-medium leading-[1.5] text-[#707071]">(10)</span>
                  </div>
                  <button
                    type="button"
                    className="flex h-[36px] items-center rounded-[8px] px-[8px] text-[14px] font-medium leading-[1.43] text-[#4F46E5] transition-colors hover:bg-[#EDEDFC]"
                  >
                    See all
                  </button>
                </div>

                {/* Cards grid — 2 rows × 2 cards */}
                <div className="flex flex-col gap-[16px]">
                  <div className="flex gap-[16px]">
                    <JobCard {...VACANCIES[0]} />
                    <JobCard {...VACANCIES[1]} />
                  </div>
                  <div className="flex gap-[16px]">
                    <JobCard {...VACANCIES[2]} />
                    <JobCard {...VACANCIES[3]} />
                  </div>
                </div>
              </div>

              {/* Interview Schedule section */}
              <InterviewScheduleCard />

            </div>

            {/* Right column — Jobs Summary + Quick Insight */}
            <div className="flex w-[249px] shrink-0 flex-col gap-[16px]">
              <JobsSummaryCard />
              <QuickInsightCard />
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}
