import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('intelligence')
@UseGuards(JwtAuthGuard)
export class IntelligenceController {
  constructor(private readonly intService: IntelligenceService) {}

  @Post('enrich-text')
  async enrichText(
    @Body() body: { text: string; studentId: string },
    @CurrentUser() user: any
  ) {
    return this.intService.enrichTextWithNLP(body.text, body.studentId, user.id);
  }

  @Post('analyze-trends')
  async analyzeTrends(
    @Body() body: { studentId: string },
    @CurrentUser() user: any
  ) {
    return this.intService.analyzeObservationPattern(body.studentId, user.id);
  }
}
