'use client';

import React, { useState } from 'react';
import { PageContainer, RiskBadge, Button, StatsCard } from '@healthtech/ui';
import { useStudent } from './api/students-api';
import { FileText, AlertTriangle, TrendingUp, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';

export function StudentProfileView({ studentId }: { studentId: string }) {
  const { data: student, isLoading } = useStudent(studentId);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSubject, setMessageSubject] = useState('Acompanhamento Escolar');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!messageText) return;
    setIsSending(true);
    try {
      // Hardcode recipientId to 'admin-1' or similar for prototype if we don't have a specific teacher ID
      // Let's assume we are sending to the current student's parents or school coordination.
      await fetch('http://localhost:3001/communications/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          recipientId: 'admin-1', // Mocking a recipient ID
          subject: messageSubject,
          message: messageText,
          studentId: student.id,
        })
      });
      setIsMessageModalOpen(false);
      setMessageText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading || !student) {
    return (
      <PageContainer className="animate-pulse flex flex-col gap-8">
        <div className="h-32 bg-zinc-900 rounded-2xl w-full border border-zinc-800"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 h-96 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
          <div className="col-span-1 h-96 bg-zinc-900 rounded-2xl border border-zinc-800"></div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Profile Header */}
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-2xl font-bold text-white">
            {student.fullName.charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-white">{student.fullName}</h1>
              <RiskBadge level={student.riskLevel as any} />
            </div>
            <div className="text-zinc-400 flex items-center gap-2">
              <span>{student.school?.name}</span>
              <span>•</span>
              <span>{student.classroom?.name || 'Sem Turma'}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          <Button variant="secondary">Ver Relatório</Button>
          <Link href={`/students/${studentId}/assessments/start`}>
            <Button variant="primary">Nova Avaliação</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Clinical Timeline (EMR) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Prontuário Clínico
              </h2>
              <div className="flex gap-3 mt-6">
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                  Agendar Sessão
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => setIsMessageModalOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contactar Equipe
                </Button>
              </div>
            </div>
            
            <div className="relative border-l-2 border-zinc-800 ml-4 flex flex-col gap-8 pb-8 mt-4">
              
              {/* Dynamic Timeline */}
              {(() => {
                const events: any[] = [];
                if (student.assessmentSessions) {
                  student.assessmentSessions.forEach((s: any) => events.push({ ...s, _type: 'assessment' }));
                }
                if (student.referrals) {
                  student.referrals.forEach((r: any) => events.push({ ...r, _type: 'referral' }));
                }
                if (student.observations) {
                  student.observations.forEach((o: any) => events.push({ ...o, _type: 'observation' }));
                }

                events.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                if (events.length === 0) {
                  return <div className="text-zinc-500 text-sm pl-4">Nenhum evento clínico registrado na timeline.</div>;
                }

                return events.map((event) => {
                  if (event._type === 'assessment') {
                    return (
                      <div key={`ass-${event.id}`} className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-zinc-950 border-2 border-indigo-500 rounded-full -left-[9px] top-1"></div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">Avaliação Concluída: {event.template?.name}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Assessment</span>
                          </div>
                          <span className="text-xs text-zinc-500 mt-1 mb-3">{new Date(event.createdAt).toLocaleDateString()}</span>
                          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-zinc-300">Score Total: <strong>{event.score || 0}</strong></span>
                              <RiskBadge level={event.riskLevel || 'neutral'} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (event._type === 'referral') {
                    return (
                      <div key={`ref-${event.id}`} className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-zinc-950 border-2 border-orange-500 rounded-full -left-[9px] top-1"></div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">Encaminhamento Solicitado</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">Referral</span>
                          </div>
                          <span className="text-xs text-zinc-500 mt-1 mb-3">{new Date(event.createdAt).toLocaleDateString()}</span>
                          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
                            {event.reason}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (event._type === 'observation') {
                    return (
                      <div key={`obs-${event.id}`} className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-zinc-950 border-2 border-zinc-500 rounded-full -left-[9px] top-1"></div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">Observação Comportamental</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-500/10 text-zinc-400 border border-zinc-500/20">Observation</span>
                          </div>
                          <span className="text-xs text-zinc-500 mt-1 mb-3">{new Date(event.createdAt).toLocaleDateString()}</span>
                          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
                            {event.description}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  return null;
                });
              })()}
            </div>
          </div>
        </div>

        {/* Right Col: Stats & Details */}
        <div className="flex flex-col gap-6">
          <StatsCard 
            label="Nível de Risco" 
            value="Alto" 
            trend="up" 
            change="Aumentou nas últimas 2 semanas"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatsCard 
            label="Total de Observações" 
            value="14" 
            trend="neutral" 
            icon={<FileText className="w-5 h-5" />}
          />
          
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tags Comportamentais</h3>
            <div className="flex flex-wrap gap-2">
              {student.tags ? (
                (() => {
                  try {
                    const parsedTags = JSON.parse(student.tags);
                    if (Array.isArray(parsedTags) && parsedTags.length > 0) {
                      return parsedTags.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700">
                          {tag}
                        </span>
                      ));
                    }
                    return <span className="text-xs text-zinc-500">Nenhuma tag registrada.</span>;
                  } catch (e) {
                    return <span className="px-2 py-1 rounded bg-zinc-800 text-xs font-medium text-zinc-300 border border-zinc-700">{student.tags}</span>;
                  }
                })()
              ) : (
                <span className="text-xs text-zinc-500">Nenhuma tag registrada.</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Contactar Equipe</h3>
              <button 
                onClick={() => setIsMessageModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Assunto</label>
                <input 
                  type="text" 
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Mensagem</label>
                <textarea 
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Descreva o motivo do contato..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 mt-2"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
