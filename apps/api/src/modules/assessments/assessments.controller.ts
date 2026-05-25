import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('assessments')
@UseGuards(JwtAuthGuard)
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Get('templates')
  getTemplates() {
    return this.assessmentsService.getTemplates();
  }

  @Post('start')
  startSession(@Body() body: { studentId: string, templateId: string }, @CurrentUser() user: any) {
    return this.assessmentsService.startSession(body.studentId, user.id, body.templateId);
  }

  @Post(':sessionId/complete')
  completeSession(
    @Param('sessionId') sessionId: string,
    @Body() body: { answers: { questionId: string, answer: string, score: number }[] }
  ) {
    return this.assessmentsService.completeSession(sessionId, body.answers);
  }
}
