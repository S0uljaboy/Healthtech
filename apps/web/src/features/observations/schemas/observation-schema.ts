import { z } from 'zod';

export const ObservationSchema = z.object({
  studentId: z.string().uuid(),
  intensity: z.enum(['low', 'moderate', 'high', 'critical']),
  frequency: z.enum(['once', 'sometimes', 'frequent']),
  context: z.string().optional(),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  tags: z.array(z.string()).optional(),
  categoryIds: z.array(z.string().uuid()).min(1, 'Selecione ao menos uma categoria'),
});

export type ObservationFormData = z.infer<typeof ObservationSchema>;
