import React from 'react';
import { PageContainer, StatsCard, Button, RiskBadge } from '@healthtech/ui';
import { FileText, Users, ArrowRight, BrainCircuit, Activity } from 'lucide-react';
import Link from 'next/link';
import { useStudents } from '../students/api/students-api';

export function ClinicalDashboardView() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  return (
    <PageContainer className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Plataforma Clínica</h1>
          <p className="text-zinc-400 mt-1">Gestão de encaminhamentos, triagens e sessões terapêuticas.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Análise IA</Button>
          <Button variant="primary">Nova Sessão</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          label="Encaminhamentos (Fila)" 
          value="12" 
          change="+3 urgentes" 
          trend="up" 
          icon={<Users className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Questionários SNAP-IV" 
          value="8" 
          change="Aguardando retorno" 
          trend="neutral" 
          icon={<FileText className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Sessões Realizadas" 
          value="45" 
          change="+12 este mês" 
          trend="up" 
          icon={<Activity className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Triagem IA" 
          value="98%" 
          change="Precisão média" 
          trend="up" 
          icon={<BrainCircuit className="w-5 h-5" />} 
        />
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Triage & Queue */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Fila de Triagem (Prioridade)</h2>
              <Button variant="ghost" size="sm" className="gap-2">Ver backlog <ArrowRight className="w-4 h-4" /></Button>
            </div>
            
            <div className="flex flex-col gap-4">
              {studentsLoading ? (
                <div className="animate-pulse flex flex-col gap-4">
                  <div className="h-32 bg-zinc-800/50 rounded-xl"></div>
                  <div className="h-32 bg-zinc-800/50 rounded-xl"></div>
                </div>
              ) : (
                students?.map((patient: any) => (
                  <div key={patient.id} className="flex flex-col p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-white">{patient.fullName}</span>
                        <span className="text-xs text-zinc-500">{patient.classroom?.name || 'Sem Turma'}</span>
                        <RiskBadge level={patient.riskLevel?.toLowerCase() as any || 'neutral'} />
                      </div>
                      <div className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-xs border border-indigo-500/20">
                        <BrainCircuit className="w-3 h-3" />
                        IA Confiança: 94%
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 bg-zinc-900 p-3 rounded-lg border border-zinc-800/50 leading-relaxed">
                      <span className="font-semibold text-zinc-500 mr-2">Motivo:</span>
                      Avaliação inteligente detectou possíveis alertas comportamentais baseados no perfil.
                    </p>
                    <div className="flex justify-end gap-2 mt-1">
                      <Link href={`/students/${patient.id}`}>
                        <Button variant="ghost" size="sm">Ver Prontuário</Button>
                      </Link>
                      <Button variant="secondary" size="sm">Iniciar Avaliação</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Schedule */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-semibold text-white">Agenda do Dia</h2>
            
            <div className="flex flex-col gap-3">
              {[
                { time: '14:00', patient: 'João Pedro', type: 'Sessão de Acompanhamento' },
                { time: '15:30', patient: 'Ana Beatriz', type: 'Avaliação Inicial' },
                { time: '17:00', patient: 'Pais do Lucas', type: 'Devolutiva SNAP-IV' },
              ].map((schedule, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-lg border border-zinc-800/30 hover:border-zinc-700 bg-zinc-950/50">
                  <div className="flex flex-col items-center justify-center min-w-[50px]">
                    <span className="text-sm font-bold text-indigo-400">{schedule.time}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-200">{schedule.patient}</span>
                    <span className="text-xs text-zinc-500">{schedule.type}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-auto">Ver Agenda Completa</Button>
          </div>
        </div>
      </div>

    </PageContainer>
  );
}
