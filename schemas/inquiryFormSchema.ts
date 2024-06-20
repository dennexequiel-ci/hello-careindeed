import * as z from 'zod';

export const inquiryFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  zipCode: z
    .string()
    .min(5, { message: 'Zip code must be at least 5 characters' })
    .regex(/^\d+$/, { message: 'Zip code must only contain numbers' }),
  staffingTypes: z
    .array(z.string())
    .min(1, 'At least one staffing type must be selected'),
});
