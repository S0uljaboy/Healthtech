'use client';

import React, { useState } from 'react';
import { PageContainer, Button, RiskBadge } from '@healthtech/ui';
import { QuestionCard } from './components/QuestionCard';
import { useCompleteSession } from './api/assessments-api';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentPlayerProps {
  sessionId: string;
  template: {
    name: string;
    description: string;
    questions: any[];
  };
  onComplete?: () => void;
}

export function AssessmentPlayer({ sessionId, template, onComplete }: AssessmentPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; answer: string; score: number }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  
  const completeSession = useCompleteSession();

  const handleSelect = (value: string, score: number) => {
    const question = template.questions[currentQuestionIndex];
    
    // Save answer
    const newAnswers = [...answers, { questionId: question.id, answer: value, score }];
    setAnswers(newAnswers);

    // Proceed to next or finish
    if (currentQuestionIndex < template.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300); // Small delay for smooth UX
    } else {
      setIsFinished(true);
      completeSession.mutate({ sessionId, answers: newAnswers });
    }
  };

  const progress = ((currentQuestionIndex) / template.questions.length) * 100;

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">Avaliação Concluída!</h2>
        
        {completeSession.isPending ? (
          <p className="text-zinc-400">Processando resultados e gerando relatório clínico...</p>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-zinc-400">Resultados calculados com sucesso.</p>
            {completeSession.data && (
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col gap-2 mt-4">
                <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">Interpretação Automática</span>
                <div className="flex items-center gap-3 justify-center mb-2">
                  <span className="text-xl font-medium text-white">{completeSession.data.interpretation.classification}</span>
                  <RiskBadge level={completeSession.data.interpretation.riskLevel} />
                </div>
                <p className="text-sm text-zinc-400 max-w-md italic">{completeSession.data.interpretation.disclaimer}</p>
              </div>
            )}
            <Button variant="primary" onClick={onComplete} className="mt-4">Voltar ao Perfil</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh]">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-12">
        <motion.div 
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {template.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q.question}
            options={q.options as any}
            index={idx}
            total={template.questions.length}
            onSelect={handleSelect}
            isActive={idx === currentQuestionIndex}
          />
        ))}
      </div>
    </div>
  );
}
