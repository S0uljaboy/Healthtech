import { z } from 'zod';
export declare const RegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["SUPER_ADMIN", "SCHOOL_ADMIN", "PSYCHOLOGIST", "TEACHER", "GUARDIAN"]>;
    tenantId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "PSYCHOLOGIST" | "TEACHER" | "GUARDIAN";
    tenantId: string;
}, {
    email: string;
    password: string;
    name: string;
    role: "SUPER_ADMIN" | "SCHOOL_ADMIN" | "PSYCHOLOGIST" | "TEACHER" | "GUARDIAN";
    tenantId: string;
}>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
