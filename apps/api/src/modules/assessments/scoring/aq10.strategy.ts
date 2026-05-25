import { Injectable } from '@nestjs/common';
import { ScoringStrategy } from './scoring.strategy';
import { AssessmentAnswer } from '@healthtech/database';

@Injectable()
export class Aq10Strategy implements ScoringStrategy {
  calculateScore(answers: Partial<AssessmentAnswer>[]): number {
    // Basic implementation for AQ-10: sum of answers that indicate traits
    // In AQ-10, score is 0-10
    return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
  }
}
