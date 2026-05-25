export interface InterpretationResult {
  classification: string;
  recommendations: string[];
  riskLevel: string;
  disclaimer: string;
}

export abstract class BaseInterpreter {
  protected readonly disclaimer = "Ferramenta de apoio preventivo. Não substitui avaliação clínica profissional.";

  abstract interpret(score: number): InterpretationResult;
}
