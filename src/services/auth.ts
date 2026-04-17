// Mock auth service — swap this file when the real backend is ready.
// Simulates a 1s network round-trip.

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

const MOCK_CREDENTIALS = {
  email: 'admin@gitgi.com',
  password: 'password123',
}

export async function signIn(payload: SignInPayload): Promise<AuthUser> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1000))

  if (
    payload.email === MOCK_CREDENTIALS.email &&
    payload.password === MOCK_CREDENTIALS.password
  ) {
    return {
      id: '1',
      email: payload.email,
      name: 'Admin User',
      token: 'mock-jwt-token',
    }
  }

  // Mimic a 401 from a real API
  throw new Error('Invalid email or password. Please try again.')
}
