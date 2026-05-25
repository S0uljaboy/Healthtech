import { Injectable } from '@nestjs/common';
import { BaseInterpreter, InterpretationResult } from './base.interpreter';

@Injectable()
export class SnapInterpreter extends BaseInterpreter {
  interpret(score: number): InterpretationResult {
    let classification = 'Abaixo do ponto de corte';
    let riskLevel = 'low';
    const recommendations: string[] = [];

    if (score >= 18) {
      classification = 'Acima do ponto de corte (Possível risco clínico)';
      riskLevel = 'high';
      recommendations.push('Aconselhável avaliação multidisciplinar (Neuropediatra/Psiquiatra Infantil).');
    } else if (score >= 12) {
      classification = 'Sintomas subclínicos ou moderados';
      riskLevel = 'medium';
      recommendations.push('Monitorar comportamento nas próximas semanas.');
    } else {
      recommendations.push('Comportamento dentro do esperado.');
    }

    return {
      classification,
      recommendations,
      riskLevel,
      disclaimer: this.disclaimer,
    };
  }
}
