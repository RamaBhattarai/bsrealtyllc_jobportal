import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Sidebar } from '../components/ui/Sidebar'
import { Topbar } from '../components/ui/Topbar'
import { KPICard } from '../components/ui/KPICard'
import { JobsSummaryCard } from '../components/ui/JobsSummaryCard'
import { HiringActivityChart } from '../components/ui/HiringActivityChart'
import { ApplicationsByRoleChart } from '../components/ui/ApplicationsByRoleChart'
import { QuickInsightCard } from '../components/ui/QuickInsightCard'
import { JobCard } from '../components/ui/JobCard'
import { InterviewScheduleCard } from '../components/ui/InterviewScheduleCard'
import { ApplicantsListCard } from '../components/ui/ApplicantsListCard'
import { CreateJobModal } from '../components/ui/CreateJobModal'
import { PlusIcon } from '@heroicons/react/24/outline'
import { MonthSelector } from '../components/ui/MonthSelector'
import { getDashboardStats } from '../services/dashboard'
import { getInterviews } from '../services/interviews'
import { getJobs, createJob } from '../services/jobs'
import type { CreateJobFormValues } from '../schemas/createJob.schema'

export function DashboardPage() {
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()

  async function handleCreateJob(values: CreateJobFormValues) {
    await createJob(values)
    await queryClient.invalidateQueries({ queryKey: ['jobs'] })
    setShowModal(false)
  }

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  })

  const { data: interviews = [] } = useQuery({
    queryKey: ['interviews'],
    queryFn: getInterviews,
  })

  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
  })

  const activeJobs = jobs.filter((j) => j.status === 'ACTIVE').slice(0, 4)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F9FAFB]">
      {showModal && (
        <CreateJobModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateJob}
        />
      )}
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">

          {/* Page header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-[22px] font-bold leading-[1.273] text-[#020617]">Dashboard</h1>
              <p className="text-[14px] font-normal leading-[1.43] text-[#707071]">
                Track job postings, review candidates, and manage interviews.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <MonthSelector />
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex h-10 items-center gap-1 rounded-[12px] bg-[#4F46E5] px-3 py-2 transition-colors hover:bg-[#3F38B7]"
              >
                <PlusIcon className="size-4 text-[#EDEDFC]" />
                <span className="text-[14px] font-medium leading-[1.43] text-[#EDEDFC]">Create Job</span>
              </button>
            </div>
          </div>

          {/* Two-column content */}
          <div className="mt-6 flex gap-4">

            {/* Left column */}
            <div className="flex min-w-0 flex-1 flex-col gap-4">

              {/* KPI cards row */}
              <div className="flex gap-4">
                <KPICard label="Applications" value={stats?.kpis.totalApplications ?? 0} trend={25} trendDirection="up" />
                <KPICard label="In Process"   value={stats?.kpis.inProcess        ?? 0} trend={25} trendDirection="down" />
                <KPICard label="Hired"        value={stats?.kpis.hired            ?? 0} trend={25} trendDirection="up" />
                <KPICard label="Rejected"     value={stats?.kpis.rejected         ?? 0} trend={25} trendDirection="down" />
              </div>

              {/* Charts row */}
              <div className="flex gap-4">
                <HiringActivityChart data={stats?.hiringActivity} />
                <ApplicationsByRoleChart />
              </div>

              {/* Current Vacancies + Interview Schedule */}
              <div className="flex gap-4">

                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-[18px] font-medium leading-[1.333] text-[#000000]">Current Vacancies</span>
                      <span className="text-[16px] font-medium leading-normal text-[#707071]">({jobs.length})</span>
                    </div>
                    <button
                      type="button"
                      className="flex h-9 items-center rounded-lg px-2 text-[14px] font-medium leading-[1.43] text-[#4F46E5] transition-colors hover:bg-[#EDEDFC]"
                    >
                      See all
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      {activeJobs[0] && <JobCard title={activeJobs[0].title} tags={[activeJobs[0].type, activeJobs[0].location]} applicantCount={0} />}
                      {activeJobs[1] && <JobCard title={activeJobs[1].title} tags={[activeJobs[1].type, activeJobs[1].location]} applicantCount={0} />}
                    </div>
                    <div className="flex gap-4">
                      {activeJobs[2] && <JobCard title={activeJobs[2].title} tags={[activeJobs[2].type, activeJobs[2].location]} applicantCount={0} />}
                      {activeJobs[3] && <JobCard title={activeJobs[3].title} tags={[activeJobs[3].type, activeJobs[3].location]} applicantCount={0} />}
                    </div>
                  </div>
                </div>

                <div className="w-[560px] shrink-0">
                  <InterviewScheduleCard interviews={interviews} />
                </div>

              </div>

            </div>

            {/* Right column */}
            <div className="flex w-[249px] shrink-0 flex-col gap-4">
              <JobsSummaryCard
                active={stats?.jobSummary.active}
                draft={stats?.jobSummary.draft}
                onHold={stats?.jobSummary.onHold}
                closed={stats?.jobSummary.closed}
              />
              <QuickInsightCard />
            </div>

          </div>

          {/* Applicants List */}
          <div className="mt-4">
            <ApplicantsListCard />
          </div>

        </main>
      </div>
    </div>
  )
}
