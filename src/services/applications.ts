import { api } from '../lib/axios'

export interface Attendee {
  email: string
  name: string
  role: string
  isCandidate: boolean
}

export interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location?: string
  skills?: string | string[]
  experience?: string | { company: string; role: string }[]
  linkedinUrl?: string
  githubUrl?: string
  resumeUrl?: string
  resumeName?: string
}

export interface Application {
  id: string
  jobId: string
  candidateId: string
  status: string
  appliedAt: string
  updatedAt: string
  notes: string
  candidate: Candidate
  job: {
    id: string
    title: string
  }
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

interface ApplicationsResponse {
  applications: Application[]
  total: number
  page: number
  limit: number
}

export async function getApplications(): Promise<Application[]> {
  const { data } = await api.get<ApiResponse<ApplicationsResponse>>('/applications')
  return data.data.applications
}

export async function getApplicationById(id: string): Promise<Application> {
  const { data } = await api.get<ApiResponse<Application>>(`/applications/${id}`)
  return data.data
}

export async function createApplication(formData: FormData): Promise<Application> {
  const { data } = await api.post<ApiResponse<Application>>('/applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data
}

export async function updateApplicationStatus(id: string, status: string, notes?: string): Promise<Application> {
  const { data } = await api.patch<ApiResponse<Application>>(`/applications/${id}/status`, { status, notes })
  return data.data
}
