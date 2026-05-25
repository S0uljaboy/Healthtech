import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ScoringEngine } from './scoring/scoring.engine';
import { InterpretationEngine } from './interpreters/interpretation.engine';

@Injectable()
export class AssessmentsService {
  constructor(
    private prisma: PrismaService,
    private scoringEngine: ScoringEngine,
    private interpretationEngine: InterpretationEngine,
  ) {}

  async startSession(studentId: string, psychologistId: string, templateId: string) {
    return this.prisma.assessmentSession.create({
      data: {
        studentId,
        psychologistId,
        templateId,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });
  }

  async completeSession(sessionId: string, answersData: { questionId: string, answer: string, score: number }[]) {
    const session = await this.prisma.assessmentSession.findUnique({
      where: { id: sessionId },
      include: { template: true },
    });

    if (!session) throw new NotFoundException('Session not found');

    // Save answers
    await this.prisma.assessmentAnswer.createMany({
      data: answersData.map(a => ({
        sessionId,
        questionId: a.questionId,
        answer: a.answer,
        score: a.score,
      })),
    });

    const answers = await this.prisma.assessmentAnswer.findMany({ where: { sessionId } });

    // Calculate Score
    const totalScore = this.scoringEngine.calculateScore(session.template.slug, answers);

    // Interpret Score
    const interpretation = this.interpretationEngine.interpret(session.template.slug, totalScore);

    // Update Session
    const completedSession = await this.prisma.assessmentSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        score: totalScore,
        riskLevel: interpretation.riskLevel,
        completedAt: new Date(),
      },
      include: {
        answers: true,
        template: true,
      }
    });

    return {
      session: completedSession,
      interpretation,
    };
  }

  async getTemplates() {
    return this.prisma.assessmentTemplate.findMany({
      where: { isActive: true },
      include: {
        questions: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }
}
