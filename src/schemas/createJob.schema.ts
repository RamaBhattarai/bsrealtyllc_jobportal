import { z } from 'zod'

export const JOB_TYPES = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'] as const
export const JOB_TYPE_LABELS: Record<typeof JOB_TYPES[number], string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
}

export const DEPARTMENTS = ['HR', 'ENGINEERING', 'MARKETING', 'SALES', 'FINANCE', 'OPERATIONS', 'DESIGN', 'LEGAL'] as const
export const EXPERIENCE_LEVELS = ['ENTRY_LEVEL', 'MID_LEVEL', 'SENIOR_LEVEL', 'LEAD', 'MANAGER'] as const
export const EXPERIENCE_LEVEL_LABELS: Record<typeof EXPERIENCE_LEVELS[number], string> = {
  ENTRY_LEVEL: 'Entry Level',
  MID_LEVEL: 'Mid Level',
  SENIOR_LEVEL: 'Senior Level',
  LEAD: 'Lead',
  MANAGER: 'Manager',
}
export const JOB_STATUSES = ['ACTIVE', 'DRAFT', 'CLOSED'] as const

export const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  department: z.enum([...DEPARTMENTS], { invalid_type_error: 'Please select a department' }),
  location: z.string().min(1, 'Location is required'),
  type: z.enum([...JOB_TYPES], { invalid_type_error: 'Please select a job type' }),
  experienceLevel: z.enum([...EXPERIENCE_LEVELS], { invalid_type_error: 'Please select an experience level' }),
  minExperienceYears: z.coerce
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Cannot be negative'),
  maxExperienceYears: z.coerce
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Cannot be negative'),
  salaryMin: z.coerce
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Cannot be negative'),
  salaryMax: z.coerce
    .number({ invalid_type_error: 'Must be a number' })
    .min(0, 'Cannot be negative'),
  description: z.string().min(1, 'Description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  status: z.enum([...JOB_STATUSES], { invalid_type_error: 'Please select a status' }),
})
  .refine((d) => d.maxExperienceYears >= d.minExperienceYears, {
    message: 'Max experience must be ≥ min experience',
    path: ['maxExperienceYears'],
  })
  .refine((d) => d.salaryMax >= d.salaryMin, {
    message: 'Max salary must be ≥ min salary',
    path: ['salaryMax'],
  })

export type CreateJobFormValues = z.infer<typeof createJobSchema>
