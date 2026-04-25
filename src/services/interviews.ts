import { api } from '../lib/axios'

export const INTERVIEW_TYPES = ['TECHNICAL', 'HR', 'CULTURAL', 'FINAL'] as const
export type InterviewType = typeof INTERVIEW_TYPES[number]

export const INTERVIEW_STATUSES = ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'] as const
export type InterviewStatus = typeof INTERVIEW_STATUSES[number]

export interface UpdateInterviewPayload {
  scheduledAt?: string
  durationMins?: number
  timezone?: string
  type?: InterviewType
  location?: string
  videoConferenceUrl?: string
  notes?: string
  status?: InterviewStatus
}

export interface CreateInterviewPayload {
  applicationId: string
  scheduledAt: string
  durationMins: number
  timezone: string
  type: InterviewType
  location?: string
  videoConferenceUrl?: string
  notes?: string
  attendees: {
    email: string
    name: string
    role: string
    isCandidate: boolean
  }[]
}

export interface Interview {
  id: string
  applicationId: string
  scheduledAt: string
  endAt?: string
  durationMins: number
  timezone: string
  type: string
  status?: string
  location?: string
  videoConferenceUrl?: string
  notes?: string
  application?: {
    candidate: { firstName: string; lastName: string }
    job: { title: string }
  }
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export async function createInterview(payload: CreateInterviewPayload): Promise<Interview> {
  const { data } = await api.post<ApiResponse<Interview>>('/interviews', payload)
  return data.data
}

export async function getInterviews(): Promise<Interview[]> {
  const { data } = await api.get<ApiResponse<Interview[]>>('/interviews')
  return data.data
}

export async function updateInterview(id: string, payload: UpdateInterviewPayload): Promise<Interview> {
  const { data } = await api.patch<ApiResponse<Interview>>(`/interviews/${id}`, payload)
  return data.data
}

export async function replaceInterview(id: string, payload: Omit<UpdateInterviewPayload, 'status'>): Promise<Interview> {
  const { data } = await api.put<ApiResponse<Interview>>(`/interviews/${id}`, payload)
  return data.data
}
