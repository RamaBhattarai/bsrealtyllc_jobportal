import { api } from '../lib/axios'

export interface SignInPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  token: string
}

interface SignInResponse {
  data: {
    user: { id: string; email: string; name: string }
    accessToken: string
  }
}

export async function signIn(payload: SignInPayload): Promise<AuthUser> {
  const { data } = await api.post<SignInResponse>('/auth/signin', payload)
  return {
    id: data.data.user.id,
    email: data.data.user.email,
    name: data.data.user.name,
    token: data.data.accessToken,
  }
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface ProfileResponse {
  data: UserProfile
}

export async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get<ProfileResponse>('/users/profile')
  return data.data
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
  await api.post('/auth/change-password', { oldPassword, newPassword })
}

export async function requestAccess(payload: { name: string; email: string; department: string; role: string }): Promise<void> {
  await api.post('/auth/request-access', payload)
}
