import { Injectable } from '@nestjs/common';
import { ScoringStrategy } from './scoring.strategy';
import { AssessmentAnswer } from '@healthtech/database';

@Injectable()
export class ScaredStrategy implements ScoringStrategy {
  calculateScore(answers: Partial<AssessmentAnswer>[]): number {
    // SCARED strategy implementation
    return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
  }
}
