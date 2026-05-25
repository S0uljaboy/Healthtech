import { z } from 'zod';
export declare const TenantSchema: z.ZodObject<{
    tenantId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    tenantId: string;
}, {
    tenantId: string;
}>;
export type TenantDto = z.infer<typeof TenantSchema>;
