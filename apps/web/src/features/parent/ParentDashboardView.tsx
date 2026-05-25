'use client';

import React from 'react';
import { PageContainer, Button } from '@healthtech/ui';
import { Heart, Activity, FileText, ArrowRight } from 'lucide-react';

export function ParentDashboardView() {
  return (
    <PageContainer className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      
      {/* Hero Section */}
      <div className="relative p-10 md:p-16 rounded-3xl bg-indigo-50 dark:bg-zinc-900/40 border border-indigo-100 dark:border-zinc-800 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex flex-col gap-4 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 w-fit mx-auto md:mx-0">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Acompanhamento Familiar</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-950 dark:text-white leading-tight">
            Olá, Família do João.
          </h1>
          <p className="text-lg text-indigo-900/60 dark:text-zinc-400 leading-relaxed">
            Estamos juntos no desenvolvimento e bem-estar do João. Aqui você encontra um resumo acolhedor das últimas semanas e materiais que preparamos com carinho para vocês.
          </p>
        </div>

        <div className="w-full md:w-auto relative z-10 flex justify-center">
          <div className="w-48 h-48 rounded-full border-4 border-white dark:border-zinc-800 shadow-xl overflow-hidden bg-indigo-100 dark:bg-zinc-800 flex items-center justify-center">
            {/* Avatar or illustration would go here */}
            <span className="text-6xl">👦</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Progress Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center mb-2">
            <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Evolução Recente</h3>
          <p className="text-zinc-500 dark:text-zinc-400 flex-1 leading-relaxed">
            João mostrou maior engajamento nas atividades de grupo esta semana. Recomendamos reforço positivo em casa!
          </p>
          <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium hover:gap-3 transition-all w-fit mt-2">
            Ver detalhes <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Resources Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-2">
            <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Materiais de Apoio</h3>
          <p className="text-zinc-500 dark:text-zinc-400 flex-1 leading-relaxed">
            Nossa equipe de psicologia separou algumas dicas sobre como criar uma rotina de sono mais tranquila.
          </p>
          <button className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium hover:gap-3 transition-all w-fit mt-2">
            Acessar biblioteca <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Card */}
        <div className="p-8 rounded-3xl bg-indigo-600 border border-indigo-500 shadow-sm flex flex-col gap-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-2 relative z-10">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold relative z-10">Fale Conosco</h3>
          <p className="text-indigo-100 flex-1 leading-relaxed relative z-10">
            A escola e os especialistas estão sempre à disposição. Deseja agendar uma conversa com o conselheiro?
          </p>
          <Button variant="secondary" className="w-fit mt-2 border-none bg-white text-indigo-600 hover:bg-indigo-50 relative z-10">
            Agendar Reunião
          </Button>
        </div>

      </div>
    </PageContainer>
  );
}
