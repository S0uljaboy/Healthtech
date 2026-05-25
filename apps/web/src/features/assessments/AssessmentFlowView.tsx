'use client';

import React, { useState } from 'react';
import { PageContainer, Button } from '@healthtech/ui';
import { useTemplates, useStartSession } from './api/assessments-api';
import { AssessmentPlayer } from './AssessmentPlayer';
import { FileText, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AssessmentFlowViewProps {
  studentId: string;
}

export function AssessmentFlowView({ studentId }: AssessmentFlowViewProps) {
  const router = useRouter();
  const { data: templates, isLoading: isLoadingTemplates } = useTemplates();
  const startSession = useStartSession();
  
  const [activeSession, setActiveSession] = useState<{ id: string, template: any } | null>(null);

  const handleStart = (templateId: string, templateObj: any) => {
    startSession.mutate(
      { studentId, templateId },
      {
        onSuccess: (data) => {
          setActiveSession({ id: data.id, template: templateObj });
        }
      }
    );
  };

  const handleComplete = () => {
    router.push(`/students/${studentId}`);
  };

  if (activeSession) {
    return (
      <PageContainer className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <AssessmentPlayer 
          sessionId={activeSession.id} 
          template={activeSession.template} 
          onComplete={handleComplete} 
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.back()} className="text-zinc-500 hover:text-white flex items-center gap-2 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar ao Perfil
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-white">Nova Avaliação Clínica</h1>
          <p className="text-zinc-400 mt-1">Selecione o instrumento de avaliação adequado.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingTemplates ? (
          <div className="col-span-full flex items-center justify-center py-20 text-zinc-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Carregando instrumentos...
          </div>
        ) : (
          templates?.map((template: any) => (
            <div key={template.id} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{template.name}</h3>
                <p className="text-sm text-zinc-400 mt-1 line-clamp-3">{template.description}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800/50">
                <span className="text-xs text-zinc-500">{template.questions?.length || 0} perguntas</span>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleStart(template.id, template)}
                  disabled={startSession.isPending}
                >
                  {startSession.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Iniciar'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

    </PageContainer>
  );
}
