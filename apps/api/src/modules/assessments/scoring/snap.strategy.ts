import { Injectable } from '@nestjs/common';
import { ScoringStrategy } from './scoring.strategy';
import { AssessmentAnswer } from '@healthtech/database';

@Injectable()
export class SnapStrategy implements ScoringStrategy {
  calculateScore(answers: Partial<AssessmentAnswer>[]): number {
    // Basic implementation for SNAP-IV: sum of answer scores
    // Typically, answer scores are 0-3
    return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
  }
}
