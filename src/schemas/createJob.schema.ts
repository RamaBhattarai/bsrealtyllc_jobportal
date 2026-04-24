import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  slug: z.string().min(1, 'Slug is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship'], {
    error: 'Please select a job type',
  }),
  experienceRange: z.string().min(1, 'Experience range is required'),
  salary: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
})

export type CreateJobFormValues = z.infer<typeof createJobSchema>
