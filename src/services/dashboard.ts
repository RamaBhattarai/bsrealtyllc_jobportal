import { api } from '../lib/axios'

export interface DashboardKPIs {
  totalApplications: number
  inProcess: number
  hired: number
  rejected: number
}

export interface JobSummary {
  active: number
  draft: number
  onHold: number
  closed: number
}

export interface RecentInterview {
  date: string
  time: string
  candidateName: string
  role: string
  interviewType: string
}

export interface RecentApplicant {
  name: string
  email: string
  role: string
  date: string
  status: 'Hired' | 'Screening' | 'Job Offer' | 'Rejected'
}

export interface HiringActivityEntry {
  date: string
  applications: number
  inProcess: number
}

export interface DashboardStats {
  kpis: DashboardKPIs
  jobSummary: JobSummary
  recentInterviews: RecentInterview[]
  recentApplicants: RecentApplicant[]
  hiringActivity: HiringActivityEntry[]
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats')
  return data.data
}
