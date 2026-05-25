'use client';

import React from 'react';
import { PageContainer, DataTable, RiskBadge, Button } from '@healthtech/ui';
import { useStudents } from './api/students-api';
import { ColumnDef } from '@tanstack/react-table';

export function StudentsView() {
  const { data: students, isLoading } = useStudents();

  const columns = React.useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: 'fullName',
      header: 'Nome Completo',
      cell: (info) => <span className="font-medium text-white">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'school.name',
      header: 'Escola',
    },
    {
      accessorKey: 'classroom.name',
      header: 'Turma',
      cell: (info) => info.getValue() || 'Não Atribuída',
    },
    {
      accessorKey: 'riskLevel',
      header: 'Risco Escolar',
      cell: (info) => <RiskBadge level={info.getValue() as any} />,
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: () => <Button variant="secondary" size="sm">Ver Perfil</Button>,
    }
  ], []);

  return (
    <PageContainer className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Alunos</h1>
          <p className="text-zinc-400 mt-1">Gerenciamento e monitoramento de alunos e turmas.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary">Adicionar Aluno</Button>
        </div>
      </header>

      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-12 bg-zinc-900 rounded-md w-full border border-zinc-800"></div>
          <div className="h-24 bg-zinc-900 rounded-md w-full border border-zinc-800"></div>
        </div>
      ) : (
        <DataTable columns={columns} data={students || []} />
      )}
    </PageContainer>
  );
}
