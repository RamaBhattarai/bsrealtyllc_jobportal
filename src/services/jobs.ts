import { api } from '../lib/axios'

export interface Job {
  id: string
  title: string
  slug: string
  department: string
  location: string
  type: string
  experienceRange: string
  salary?: string
  description: string
  status: string
}

export type CreateJobPayload = Pick<Job, 'title' | 'department' | 'location' | 'type' | 'description'>

interface ApiResponse<T> {
  success: boolean
  data: T
}

interface JobsResponse {
  jobs: Job[]
  total: number
  page: number
  limit: number
}

export async function getJobs(): Promise<Job[]> {
  const { data } = await api.get<ApiResponse<JobsResponse>>('/jobs')
  return data.data.jobs
}

export async function createJob(payload: CreateJobPayload): Promise<Job> {
  const { data } = await api.post<ApiResponse<Job>>('/jobs', payload)
  return data.data
}
