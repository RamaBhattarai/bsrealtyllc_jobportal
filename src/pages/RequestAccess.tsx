import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import logoSrc from '../assets/logo-new.png'
import { cn } from '../lib/cn'
import { requestAccessSchema, type RequestAccessFormValues } from '../schemas/requestAccess.schema'
import { Spinner } from '../components/ui/Spinner'

export function RequestAccessPage() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RequestAccessFormValues>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: { name: '', email: '', department: '', role: '' },
  })

  const department = watch('department')
  const role = watch('role')

  const onSubmit = async (_data: RequestAccessFormValues) => {
    setApiError('')
    try {
      // Simulate network delay — swap for real API call when backend is ready
      await new Promise(r => setTimeout(r, 1000))
      navigate('/request-access/success')
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white">

      {/* Logo — absolute top-left  x:80 y:32 */}
      <img
        src={logoSrc}
        alt="BS Realty"
        className="absolute top-0 left-0 w-[168px] h-auto"
      />

      {/* Decorative indigo blur */}
      <div className="pointer-events-none absolute -left-23 -bottom-103.25 h-113.25 w-502.5 bg-[rgba(79,70,229,0.48)] opacity-20 blur-[200px]" />

      {/* Content — centred */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-[581px]">

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6 py-7 px-6"
          >
            {/* Heading */}
            <div className="flex flex-col gap-5">
              <h1 className="text-center text-headline-sm font-medium text-secondary">
                Request Access
              </h1>
              <p className="text-body-lg font-normal text-gray-900">
                This portal is restricted to authorized GITGI hiring team members.
                Submit your request and HR will review your access.
              </p>
            </div>

            {/* Fields + button */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">

                {/* Name */}
                <Input
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  error={!!errors.name}
                  errorMessage={errors.name?.message}
                  {...register('name')}
                />

                {/* Email — hint shown when no error, error message shown when invalid */}
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

                {/* Department dropdown */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <select
                      {...register('department')}
                      className={cn(
                        'w-full appearance-none rounded-sm border bg-white',
                        'py-4 pl-5 pr-10',
                        'text-body-lg font-normal',
                        'transition-colors focus:outline-none',
                        errors.department
                          ? 'border-error'
                          : 'border-gray-400 hover:border-gray-600 focus:border-primary-darker',
                        department ? 'text-gray-900' : 'text-gray-800',
                      )}
                    >
                      <option value="" disabled hidden>Enter your Department</option>
                      <option value="hr">Human Resources</option>
                      <option value="engineering">Engineering</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                      <option value="marketing">Marketing</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-800" />
                  </div>
                  {errors.department && (
                    <p className="text-sm leading-normal text-error">{errors.department.message}</p>
                  )}
                </div>

                {/* Role dropdown */}
                <div className="flex flex-col gap-1.5">
                  <div className="relative">
                    <select
                      {...register('role')}
                      className={cn(
                        'w-full appearance-none rounded-sm border bg-white',
                        'py-4 pl-5 pr-10',
                        'text-body-lg font-normal',
                        'transition-colors focus:outline-none',
                        errors.role
                          ? 'border-error'
                          : 'border-gray-400 hover:border-gray-600 focus:border-primary-darker',
                        role ? 'text-gray-900' : 'text-gray-800',
                      )}
                    >
                      <option value="" disabled hidden>Enter your Role</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="hiring-manager">Hiring Manager</option>
                      <option value="hr-admin">HR Administrator</option>
                      <option value="interviewer">Interviewer</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-gray-800" />
                  </div>
                  {errors.role && (
                    <p className="text-sm leading-normal text-error">{errors.role.message}</p>
                  )}
                </div>

              </div>

              {/* API error */}
              {apiError && (
                <p role="alert" className="w-full text-body-md font-medium text-error">
                  {apiError}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
                leftIcon={isSubmitting ? <Spinner className="size-[18px]" /> : undefined}
              >
                {isSubmitting ? 'Submitting…' : 'Submit Request'}
              </Button>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}
