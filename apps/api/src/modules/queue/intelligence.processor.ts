import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { IntelligenceService } from '../intelligence/intelligence.service';
import { Logger } from '@nestjs/common';

@Processor('intelligence')
export class IntelligenceQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(IntelligenceQueueProcessor.name);

  constructor(private readonly intelligenceService: IntelligenceService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'analyze_pattern':
        return this.intelligenceService.analyzeObservationPattern(job.data.studentId);
      
      case 'generate_recommendation':
        return this.intelligenceService.generateClinicalRecommendation(job.data.sessionId);

      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }
}
