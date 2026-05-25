import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { IntelligenceQueueProcessor } from './intelligence.processor';
import { IntelligenceModule } from '../intelligence/intelligence.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        connection: {
          url: process.env.REDIS_URL || 'redis://localhost:6379',
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'intelligence',
    }),
    IntelligenceModule,
  ],
  providers: [IntelligenceQueueProcessor],
  exports: [BullModule],
})
export class QueueModule {}
