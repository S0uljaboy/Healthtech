import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['SUPER_ADMIN', 'SCHOOL_ADMIN', 'PSYCHOLOGIST', 'TEACHER', 'GUARDIAN']),
  tenantId: z.string().uuid(),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
