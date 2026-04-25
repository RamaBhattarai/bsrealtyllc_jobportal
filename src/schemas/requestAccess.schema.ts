import { z } from 'zod'

export const requestAccessSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address')
    .refine((val) => val.endsWith('@gitgi.com'), 'Please use your @gitgi.com email'),

  department: z
    .string()
    .min(1, 'Please select a department'),

  role: z
    .string()
    .min(1, 'Please select a role'),
})

export type RequestAccessFormValues = z.infer<typeof requestAccessSchema>
