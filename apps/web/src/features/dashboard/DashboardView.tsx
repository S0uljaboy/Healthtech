import React from 'react';
import { PageContainer, StatsCard, Button, RiskBadge } from '@healthtech/ui';
import { Users, AlertCircle, FileText, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useStudents } from '../students/api/students-api';
import Link from 'next/link';

export function DashboardView() {
  const { data: students, isLoading } = useStudents();
  return (
    <PageContainer className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Geral</h1>
          <p className="text-zinc-400 mt-1">Resumo do comportamento escolar e alertas recentes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Relatórios</Button>
          <Button variant="primary">Nova Observação</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard 
          label="Total de Alunos" 
          value="2.845" 
          change="+43 este mês" 
          trend="up" 
          icon={<Users className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Sessões Abertas" 
          value="87" 
          change="-12" 
          trend="down" 
          icon={<FileText className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Alertas Críticos" 
          value="14" 
          change="+2 hoje" 
          trend="neutral" 
          icon={<AlertCircle className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Índice de Risco Escolar" 
          value="4.2%" 
          change="-0.5%" 
          trend="down" 
          icon={<TrendingDown className="w-5 h-5" />} 
        />
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Activity & Pending */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Encaminhamentos Recentes</h2>
              <Button variant="ghost" size="sm" className="gap-2">Ver todos <ArrowRight className="w-4 h-4" /></Button>
            </div>
            
            {/* List of Referrals */}
            <div className="flex flex-col gap-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-20 bg-zinc-800/50 rounded-xl"></div>
                ))
              ) : students && students.length > 0 ? (
                students.slice(0, 5).map((student: any) => (
                  <Link key={student.id} href={`/students/${student.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{student.fullName}</span>
                          <span className="text-xs text-zinc-500">{student.classroom?.name || 'Sem Turma'}</span>
                          <RiskBadge level={student.riskLevel?.toLowerCase() as any || 'neutral'} />
                        </div>
                        <span className="text-sm text-zinc-400">Risco potencial detectado pelos professores.</span>
                      </div>
                      <span className="text-xs text-zinc-500">Hoje</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Users className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-300">Nenhum aluno em risco crítico</h3>
                    <p className="text-sm text-zinc-500 mt-1">A IA não detectou padrões de evasão recentes.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Activity Feed / Timeline */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-semibold text-white">Timeline da Escola</h2>
            
            <div className="relative border-l border-zinc-800 ml-3 flex flex-col gap-8 pb-4">
              {[
                { type: 'alert', title: 'Alerta Crítico Gerado', time: 'Há 10 min', desc: 'Sistema detectou padrão de evasão para 3 alunos.' },
                { type: 'session', title: 'Sessão Concluída', time: 'Há 45 min', desc: 'Psicóloga Amanda finalizou atendimento (Lucas S.)' },
                { type: 'note', title: 'Observação Adicionada', time: 'Há 2 horas', desc: 'Prof. Roberto adicionou nota para Mariana C.' },
                { type: 'system', title: 'Relatório Semanal', time: 'Ontem', desc: 'Relatório consolidado enviado para coordenação.' },
              ].map((event, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-zinc-950 border-2 border-indigo-500 rounded-full -left-[6.5px] top-1.5"></div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-zinc-200">{event.title}</span>
                    <span className="text-xs text-zinc-500 mt-0.5 mb-1">{event.time}</span>
                    <span className="text-sm text-zinc-400">{event.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </PageContainer>
  );
}
