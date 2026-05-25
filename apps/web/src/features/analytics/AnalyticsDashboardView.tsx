'use client';

import React from 'react';
import { PageContainer, StatsCard } from '@healthtech/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, FileText, Activity } from 'lucide-react';

const mockRiskData = [
  { name: 'Crítico', value: 12 },
  { name: 'Alto', value: 45 },
  { name: 'Médio', value: 120 },
  { name: 'Baixo', value: 310 },
  { name: 'Neutro', value: 850 },
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const mockTrendData = [
  { month: 'Jan', referrals: 20, assessments: 45 },
  { month: 'Fev', referrals: 25, assessments: 50 },
  { month: 'Mar', referrals: 40, assessments: 85 },
  { month: 'Abr', referrals: 35, assessments: 70 },
  { month: 'Mai', referrals: 55, assessments: 110 },
];

export function AnalyticsDashboardView() {
  return (
    <PageContainer className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics Clínico</h1>
        <p className="text-zinc-400 mt-1">Visão macro de saúde mental e comportamental da escola.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Alunos em Monitoramento" value="177" trend="up" icon={<Activity className="w-5 h-5 text-indigo-400" />} />
        <StatsCard label="Avaliações Pendentes" value="23" trend="down" icon={<FileText className="w-5 h-5 text-indigo-400" />} />
        <StatsCard label="Encaminhamentos (Mês)" value="55" trend="up" icon={<AlertTriangle className="w-5 h-5 text-orange-400" />} />
        <StatsCard label="Atendimentos Concluídos" value="482" trend="neutral" icon={<Users className="w-5 h-5 text-green-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        
        {/* Risk Distribution Chart */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-6 h-96">
          <h3 className="text-lg font-medium text-white">Distribuição de Risco (Geral)</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockRiskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} 
                  itemStyle={{ color: '#fff' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trends Chart */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col gap-6 h-96">
          <h3 className="text-lg font-medium text-white">Evolução de Avaliações e Encaminhamentos</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }} 
                />
                <Bar dataKey="assessments" name="Avaliações" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="referrals" name="Encaminhamentos" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
