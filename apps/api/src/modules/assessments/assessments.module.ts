import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ScoringEngine } from './scoring/scoring.engine';
import { SnapStrategy } from './scoring/snap.strategy';
import { Aq10Strategy } from './scoring/aq10.strategy';
import { ScaredStrategy } from './scoring/scared.strategy';
import { InterpretationEngine } from './interpreters/interpretation.engine';
import { SnapInterpreter } from './interpreters/snap.interpreter';

@Module({
  imports: [PrismaModule],
  controllers: [AssessmentsController],
  providers: [
    AssessmentsService,
    ScoringEngine,
    SnapStrategy,
    Aq10Strategy,
    ScaredStrategy,
    InterpretationEngine,
    SnapInterpreter,
  ],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
