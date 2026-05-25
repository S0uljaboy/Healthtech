import { Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { RiskEngineService } from './risk-engine.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ObservationsController],
  providers: [ObservationsService, RiskEngineService],
  exports: [ObservationsService, RiskEngineService],
})
export class ObservationsModule {}
