import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseInterpreter, InterpretationResult } from './base.interpreter';
import { SnapInterpreter } from './snap.interpreter';

@Injectable()
export class InterpretationEngine {
  private interpreters = new Map<string, BaseInterpreter>();

  constructor(
    private snapInterpreter: SnapInterpreter,
  ) {
    this.interpreters.set('snap-iv', snapInterpreter);
    // Add AQ10, SCARED later
  }

  interpret(templateSlug: string, score: number): InterpretationResult {
    const interpreter = this.interpreters.get(templateSlug);
    
    // Default fallback interpreter if specific one not found
    if (!interpreter) {
      return {
        classification: 'Score: ' + score,
        recommendations: ['Avaliação padronizada não disponível.'],
        riskLevel: 'neutral',
        disclaimer: "Ferramenta de apoio preventivo. Não substitui avaliação clínica profissional."
      };
    }
    
    return interpreter.interpret(score);
  }
}
