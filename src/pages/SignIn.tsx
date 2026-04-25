import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import illustrationSrc from '../assets/illustration-welcome.svg'
import logoSrc from '../assets/logo-new.png'
import { signInSchema, type SignInFormValues } from '../schemas/signIn.schema'
import { signIn } from '../services/auth'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'

export function SignInPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: user => {
      login(user)
      navigate('/dashboard')
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setAuthError(msg ?? 'Invalid credentials. Please try again.')
    },
  })

  const onSubmit = (data: SignInFormValues) => {
    setAuthError('')
    mutate(data)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
      <div className="relative flex w-[821px] shrink-0 items-center justify-center bg-white">

        {/* Logo — pinned top-left */}
        <img src={logoSrc} alt="BS Realty" className="absolute top-0 left-0 w-[168px] h-auto" />

        {/* Content column */}
        <div className="flex w-[581px] flex-col">

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6 px-6 py-7"
          >
            {/* Heading */}
            <div className="flex flex-col gap-5">
              <h1 className="text-center text-headline-sm font-medium text-secondary">
                Sign In
              </h1>
              <p className="text-body-lg font-normal text-gray-900">
                Sign in with your authorized GITGI email to access the hiring portal.
              </p>
            </div>

            {/* Fields + button */}
            <div className="flex flex-col items-end gap-6">
              <div className="flex w-full flex-col gap-4">

                {/* Email — hint always visible, replaced by error when invalid */}
                <div className="flex flex-col gap-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    {...register('email')}
                  />
                  {!errors.email && (
                    <p className="text-body-md font-normal text-primary-dark-hover">
                      Please use your @gitgi.com email.
                    </p>
                  )}
                </div>

                {/* Password + forgot */}
                <div className="flex w-full flex-col items-end gap-3">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="flex items-center justify-center text-gray-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword
                          ? <EyeSlashIcon className="size-5" />
                          : <EyeIcon className="size-5" />
                        }
                      </button>
                    }
                    {...register('password')}
                  />

                  <button
                    type="button"
                    className="w-[137px] text-center text-body-lg font-medium text-primary-darker hover:text-primary-dark-hover transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* API error */}
              {authError && (
                <p role="alert" className="w-full text-body-md font-medium text-error">
                  {authError}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full"
                disabled={isPending}
                leftIcon={isPending ? <Spinner className="size-4.5" /> : undefined}
              >
                {isPending ? 'Signing in…' : 'Sign In'}
              </Button>
            </div>
          </form>

          <p className="text-center text-body-lg font-medium text-gray-900">
            Don't have access ? Contact your HR administrator.
          </p>

        </div>
      </div>

      {/* ── RIGHT PANEL ───────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center bg-primary">
        <img
          src={illustrationSrc}
          alt=""
          aria-hidden="true"
          width={486}
          height={511}
        />
      </div>

    </div>
  )
}
