import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommunicationsModule } from '../communications/communications.module';

@Module({
  imports: [PrismaModule, CommunicationsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
