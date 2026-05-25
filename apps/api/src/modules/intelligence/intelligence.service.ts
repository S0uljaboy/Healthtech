import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommunicationsService } from '../communications/communications.service';

@Injectable()
export class IntelligenceService {
  private readonly logger = new Logger(IntelligenceService.name);
  private readonly AI_ENABLED = process.env.ENABLE_AI_FEATURES === 'true';

  constructor(
    private readonly prisma: PrismaService,
    private readonly commsService: CommunicationsService
  ) {}

  async enrichTextWithNLP(text: string, studentId: string, reviewerId?: string) {
    this.logger.log(`[NLP Engine] Semantic Tagging and Entity Extraction...`);
    
    // Simulate AI Latency
    await new Promise(res => setTimeout(res, 1200));

    // Simulated NLP Tagging
    const lowerText = text.toLowerCase();
    const tags = [];
    if (lowerText.includes('foco') || lowerText.includes('atenção')) tags.push('attention');
    if (lowerText.includes('ansiedade') || lowerText.includes('nervoso')) tags.push('anxiety');
    if (lowerText.includes('isolado') || lowerText.includes('sozinho')) tags.push('isolation');
    
    if (tags.length === 0) tags.push('general_observation');

    const result = {
      semanticTags: tags,
      sentiment: lowerText.includes('feliz') ? 'positive' : 'negative',
      confidence: 0.94
    };

    // Audit Log
    await this.prisma.aiAuditLog.create({
      data: {
        studentId,
        reviewerId,
        action: 'semantic_tagging',
        prompt: `Extract semantic tags and sentiment from: "${text}"`,
        result: JSON.stringify(result),
        confidence: result.confidence,
        override: false
      }
    });

    return result;
  }

  async analyzeObservationPattern(studentId: string, reviewerId?: string) {
    this.logger.log(`[NLP Engine] Analyzing textual patterns for student ${studentId}...`);
    
    // Simulate complex NLP extraction (latency)
    await new Promise(res => setTimeout(res, 2500));

    // Simulated output of an LLM or specific BERT classifier
    const simulatedInsights = [
      { category: 'SOCIAL_WITHDRAWAL', confidence: 0.89, evidence: 'Isolamento durante o intervalo repetidas vezes' },
      { category: 'ATTENTION_DEFICIT', confidence: 0.72, evidence: 'Dificuldade de focar nas últimas 3 semanas' }
    ];

    // Save AI Audit Log
    await this.prisma.aiAuditLog.create({
      data: {
        studentId,
        reviewerId,
        action: 'behavioral_trend',
        prompt: 'Analyze last 30 days of observations for semantic patterns and isolation trends.',
        result: JSON.stringify(simulatedInsights),
        confidence: 0.89,
        override: false,
      }
    });

    this.logger.log(`[NLP Engine] Completed analysis. Found ${simulatedInsights.length} critical patterns.`);

    if (simulatedInsights.length > 0 && reviewerId) {
      // Simulate Escalation
      this.commsService.sendNotification(
        reviewerId,
        'Escalada de Risco pela IA',
        `Padrão crítico detectado para aluno. Motivo: ${simulatedInsights[0].category}`,
        'alert'
      );
    }

    return { status: 'success', insights: simulatedInsights, riskFlag: 'ELEVATED' };
  }

  async generateClinicalRecommendation(assessmentSessionId: string) {
    this.logger.log(`[LLM Engine] Generating clinical recommendations for session ${assessmentSessionId}...`);
    
    // Simulate generation
    await new Promise(res => setTimeout(res, 3000));

    const recommendations = [
      "Sugerir encaminhamento para psicopedagogia visando avaliação aprofundada.",
      "Orientar os professores a utilizarem técnicas de reforço positivo.",
      "Conduzir entrevista com os pais para alinhar rotina de sono."
    ];

    return { status: 'success', recommendations };
  }
}
