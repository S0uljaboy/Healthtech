import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { ObservationsModule } from './observations/observations.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { ReferralsModule } from './modules/referrals/referrals.module';
import { ReportsModule } from './modules/reports/reports.module';
import { VisibilityModule } from './modules/visibility/visibility.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';
import { RedisCacheModule } from './modules/cache/redis-cache.module';
import { QueueModule } from './modules/queue/queue.module';
import { HealthModule } from './modules/health/health.module';
import { CommunicationsModule } from './modules/communications/communications.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { ComplianceModule } from './modules/compliance/compliance.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requests per minute
    }]),
    RedisCacheModule,
    QueueModule,
    HealthModule,
    AuthModule, 
    UsersModule, 
    PrismaModule, 
    StudentsModule, 
    ObservationsModule, 
    AssessmentsModule, 
    ReferralsModule, 
    ReportsModule, 
    VisibilityModule, 
    IntelligenceModule,
    CommunicationsModule,
    MeetingsModule,
    ComplianceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}