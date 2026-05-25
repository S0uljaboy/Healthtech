import { createZodDto } from 'nestjs-zod';
import { LoginSchema } from '@healthtech/validation';

export class LoginDto extends createZodDto(LoginSchema) {}
