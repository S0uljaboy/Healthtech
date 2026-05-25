import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import compression from 'compression';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

async function bootstrap() {
  // Initialize Sentry before the app is created
  Sentry.init({
    dsn: process.env.SENTRY_DSN || "https://mock-dsn@o000000.ingest.sentry.io/0000000",
    integrations: [
      nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Use Pino Logger
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ZodValidationPipe());

  // Hardening: Security Headers & Payload Compression
  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
