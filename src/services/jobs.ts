import { api } from '../lib/axios'

export interface Job {
  id: string
  title: string
  slug: string
  department: string
  location: string
  type: string
  experienceLevel: string
  minExperienceYears: number
  maxExperienceYears: number
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string
  status: string
}

export interface CreateJobPayload {
  title: string
  department: string
  location: string
  type: string
  experienceLevel: string
  minExperienceYears: number
  maxExperienceYears: number
  salaryMin: number
  salaryMax: number
  description: string
  requirements: string
  status: string
}

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

export async function getJobById(id: string): Promise<Job> {
  const { data } = await api.get<ApiResponse<Job>>(`/jobs/${id}`)
  return data.data
}

export async function createJob(payload: CreateJobPayload): Promise<Job> {
  const { data } = await api.post<ApiResponse<Job>>('/jobs', payload)
  return data.data
}

export async function updateJob(id: string, payload: Partial<CreateJobPayload>): Promise<Job> {
  const { data } = await api.patch<ApiResponse<Job>>(`/jobs/${id}`, payload)
  return data.data
}

export async function deleteJob(id: string): Promise<void> {
  await api.delete(`/jobs/${id}`)
}
