
import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token from localStorage to every request
api.interceptors.request.use(config => {
  const raw = localStorage.getItem('auth_user') 
  if (raw) {
    const user = JSON.parse(raw)
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  return config
})

// the response interceptor is purely
//  about handling what comes back
api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status
    const message =
      err.response?.data?.message ??
      err.response?.data?.error ??
      err.message ??
      'Something went wrong.'

    if (status === 401) {
      localStorage.removeItem('auth_user')
      toast.error('Your session has expired. Please sign in again.')
      window.location.href = '/sign-in'
    }

    return Promise.reject(new Error(message))
  },
)
