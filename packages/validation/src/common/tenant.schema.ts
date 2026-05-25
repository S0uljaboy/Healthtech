import { z } from 'zod';

export const TenantSchema = z.object({
  tenantId: z.string().uuid('Invalid tenant ID'),
});

export type TenantDto = z.infer<typeof TenantSchema>;
