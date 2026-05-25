import { Injectable, NotFoundException } from '@nestjs/common';
import { ScoringStrategy } from './scoring.strategy';
import { SnapStrategy } from './snap.strategy';
import { Aq10Strategy } from './aq10.strategy';
import { ScaredStrategy } from './scared.strategy';
import { AssessmentAnswer } from '@healthtech/database';

@Injectable()
export class ScoringEngine {
  private strategies = new Map<string, ScoringStrategy>();

  constructor(
    private snapStrategy: SnapStrategy,
    private aq10Strategy: Aq10Strategy,
    private scaredStrategy: ScaredStrategy,
  ) {
    this.strategies.set('snap-iv', snapStrategy);
    this.strategies.set('aq-10', aq10Strategy);
    this.strategies.set('scared', scaredStrategy);
    // Add CDI, M-CHAT later
  }

  calculateScore(templateSlug: string, answers: Partial<AssessmentAnswer>[]): number {
    const strategy = this.strategies.get(templateSlug);
    if (!strategy) {
      throw new NotFoundException(`Scoring strategy not found for template: ${templateSlug}`);
    }
    return strategy.calculateScore(answers);
  }
}
