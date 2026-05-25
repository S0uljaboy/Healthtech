import { Module } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommunicationsModule } from '../communications/communications.module';

@Module({
  imports: [PrismaModule, CommunicationsModule],
  controllers: [IntelligenceController],
  providers: [IntelligenceService],
  exports: [IntelligenceService],
})
export class IntelligenceModule {}
