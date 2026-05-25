import React from 'react';
import { PageContainer, StatsCard, Button, RiskBadge } from '@healthtech/ui';
import { FileText, AlertCircle, Calendar, MessageSquare, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useStudents } from '../students/api/students-api';

export function ParentDashboardView() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  return (
    <PageContainer className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Portal do Responsável</h1>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-zinc-400 mt-1">Acompanhe o desenvolvimento escolar em tempo real.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Agendar Reunião</Button>
          <Button variant="primary">Mensagem à Escola</Button>
        </div>
      </header>

      {/* Main Stats / Status */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          label="Avisos Importantes" 
          value="2" 
          change="Novos" 
          trend="neutral" 
          icon={<AlertCircle className="w-5 h-5 text-amber-500" />} 
        />
        <StatsCard 
          label="Atendimentos Agendados" 
          value="1" 
          change="Dia 28/05" 
          trend="neutral" 
          icon={<Calendar className="w-5 h-5" />} 
        />
        <StatsCard 
          label="Mensagens" 
          value="5" 
          change="Lidas" 
          trend="up" 
          icon={<MessageSquare className="w-5 h-5" />} 
        />
      </section>

      {/* Student Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Children */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-white">Meus Filhos</h2>
            
            <div className="flex flex-col gap-4">
              {studentsLoading ? (
                <div className="animate-pulse h-32 bg-zinc-800/50 rounded-xl"></div>
              ) : students && students.length > 0 ? (
                students.map((child: any) => (
                  <div key={child.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col gap-4 hover:border-indigo-500/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl">
                          {child.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">{child.fullName}</h3>
                          <p className="text-sm text-zinc-400">{child.classroom?.name || 'Sem Turma'} • {child.school?.name}</p>
                        </div>
                      </div>
                      <RiskBadge level={child.riskLevel?.toLowerCase() as any || 'neutral'} />
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300">Atenção Especial</span>
                    </div>

                    <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <span className="text-sm text-zinc-400">Verifique os alertas na timeline</span>
                      <Link href={`/students/${child.id}`}>
                        <Button variant="ghost" size="sm" className="gap-2">Acessar Perfil <ArrowRight className="w-4 h-4" /></Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex flex-col items-center justify-center gap-3">
                  <h3 className="font-medium text-zinc-300">Nenhum filho cadastrado</h3>
                  <p className="text-sm text-zinc-500">Contate a coordenação da escola para vincular seus filhos.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline / School Feed */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col gap-6 h-full">
            <h2 className="text-xl font-semibold text-white">Últimas Atualizações (Lucas)</h2>
            
            <div className="relative border-l border-zinc-800 ml-3 flex flex-col gap-8 pb-4">
              {[
                { title: 'Questionário SNAP-IV Solicitado', time: 'Hoje', desc: 'A equipe pedagógica solicitou o preenchimento do questionário.' },
                { title: 'Relatório Trimestral Disponível', time: 'Há 2 dias', desc: 'O boletim e avaliação comportamental foram publicados.' },
                { title: 'Reunião Realizada', time: 'Semana passada', desc: 'Conversa com Prof. Marina sobre participação em aula.' },
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
      {/* Mobile Bottom Navigation (Visible only on md-) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 flex justify-between px-6 py-3 z-50">
        <button className="flex flex-col items-center gap-1 text-indigo-500">
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Resumo</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium">Agenda</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 relative">
          <MessageSquare className="w-5 h-5" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-[10px] font-medium">Mensagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300">
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-medium">Boletins</span>
        </button>
      </div>
      
      {/* Spacer for mobile nav */}
      <div className="h-16 md:hidden"></div>
    </PageContainer>
  );
}
