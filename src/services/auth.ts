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
