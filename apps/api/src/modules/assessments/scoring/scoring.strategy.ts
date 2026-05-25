import { AssessmentAnswer } from '@healthtech/database';

export interface ScoringStrategy {
  calculateScore(answers: Partial<AssessmentAnswer>[]): number;
}
