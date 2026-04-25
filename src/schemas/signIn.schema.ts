import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please use your @gitgi.com email.')
    .refine((val) => val.endsWith('@gitgi.com'), 'Please use your @gitgi.com email.'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

export type SignInFormValues = z.infer<typeof signInSchema>
