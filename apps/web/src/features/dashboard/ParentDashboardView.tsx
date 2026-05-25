import React from 'react';
import { PageContainer, Button, RiskBadge } from '@healthtech/ui';
import { FileText, Calendar, MessageSquare, ArrowRight, BookOpen, Heart, Activity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useStudents } from '../students/api/students-api';

export function ParentDashboardView() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  
  return (
    <PageContainer className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      
      {/* Hero / Emotional Header */}
      <header className="relative overflow-hidden rounded-3xl p-8 md:p-12 border border-white/5 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Sincronizado com a Escola
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
              Jornada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Desenvolvimento</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed mt-2">
              Estamos caminhando juntos para garantir o melhor ambiente emocional e de aprendizado para os seus filhos.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button className="w-full md:w-auto bg-white text-zinc-950 hover:bg-zinc-200 shadow-xl shadow-white/10 transition-all">
              Nova Mensagem
            </Button>
            <Button variant="secondary" className="w-full md:w-auto backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10">
              Agendar Conversa
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Children Cards (The "Story") */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" fill="currentColor" /> Seus Filhos
            </h2>
          </div>
          
          <div className="flex flex-col gap-6">
            {studentsLoading ? (
              <div className="animate-pulse h-48 bg-zinc-900/50 border border-white/5 rounded-3xl"></div>
            ) : students && students.length > 0 ? (
              students.map((child: any) => (
                <div key={child.id} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
                  {/* Subtle Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-6 md:p-8 flex flex-col gap-6">
                    {/* Header: Avatar & Info */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-white font-bold text-2xl">
                              {child.fullName.charAt(0)}
                            </div>
                          </div>
                          {child.riskLevel === 'CRITICAL' && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-zinc-950 flex items-center justify-center">
                              <Activity className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{child.fullName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-zinc-400">{child.classroom?.name || 'Sem Turma'}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-sm text-zinc-400">{child.school?.name}</span>
                          </div>
                        </div>
                      </div>
                      <RiskBadge level={child.riskLevel?.toLowerCase() as any || 'neutral'} />
                    </div>
                    
                    {/* Emotional Status Summary */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 mt-0.5">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Status Emocional Recente</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {child.riskLevel === 'CRITICAL' 
                            ? 'A equipe pedagógica identificou oscilações que merecem nossa atenção conjunta. Recomendamos agendar uma conversa na escola para alinharmos estratégias de apoio.'
                            : 'O desenvolvimento tem ocorrido dentro do esperado. A participação em atividades coletivas demonstra bom engajamento.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <Link href={`/students/${child.id}`}>
                        <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 gap-2 font-medium">
                          Ver Diário Completo <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                  <Heart className="w-6 h-6 text-zinc-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Nenhuma criança vinculada</h3>
                  <p className="text-zinc-500 mt-1 max-w-sm mx-auto">Sua conta ainda não está conectada ao perfil do seu filho. Peça o código de acesso à coordenação.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Narrative Timeline */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Histórico Recente
            </h2>
          </div>

          <div className="p-8 rounded-3xl border border-white/5 bg-zinc-950/50 backdrop-blur-xl flex flex-col gap-8 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none"></div>

            <div className="relative border-l-2 border-zinc-800 ml-4 flex flex-col gap-10">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8">
                <div className="absolute w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 -left-4 top-0 flex items-center justify-center backdrop-blur-md">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="flex flex-col gap-1.5 -mt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Hoje, 14:30</span>
                  <span className="font-semibold text-lg text-white">Questionário Socioemocional</span>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    A psicóloga Marina solicitou o preenchimento do questionário SNAP-IV para auxiliar no mapeamento da última quinzena.
                  </p>
                  <Button variant="primary" size="sm" className="w-fit mt-2 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                    Preencher Agora
                  </Button>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8">
                <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 -left-4 top-0 flex items-center justify-center backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex flex-col gap-1.5 -mt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Há 3 dias</span>
                  <span className="font-semibold text-lg text-white">Relatório Trimestral Fechado</span>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    O boletim pedagógico e as observações de convivência foram liberados pela coordenação.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-8">
                <div className="absolute w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 -left-4 top-0 flex items-center justify-center backdrop-blur-md">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="flex flex-col gap-1.5 -mt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Há 1 semana</span>
                  <span className="font-semibold text-lg text-white">Conversa com a Professora</span>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Alinhamento realizado sobre a participação em aulas de grupo e melhoria no foco das atividades.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Visible only on md-) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 flex justify-around px-2 py-4 z-50">
        <button className="flex flex-col items-center gap-1.5 text-indigo-400">
          <Heart className="w-6 h-6" fill="currentColor" />
          <span className="text-[10px] font-medium">Jornada</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-medium">Agenda</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 relative">
          <MessageSquare className="w-6 h-6" />
          <div className="absolute top-0 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-zinc-950 rounded-full"></div>
          <span className="text-[10px] font-medium">Recados</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300">
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-medium">Arquivos</span>
        </button>
      </div>
    </PageContainer>
  );
}
