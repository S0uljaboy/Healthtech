'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Button } from '@healthtech/ui';
import { ObservationSchema, ObservationFormData } from '../schemas/observation-schema';
import { useCreateObservation } from '../api/observations-api';

interface ObservationFormProps {
  studentId: string;
  onSuccess?: () => void;
}

export function ObservationForm({ studentId, onSuccess }: ObservationFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ObservationFormData>({
    resolver: zodResolver(ObservationSchema),
    defaultValues: {
      studentId,
      intensity: 'moderate',
      frequency: 'once',
      categoryIds: [],
      tags: [],
    }
  });

  const createObservation = useCreateObservation();

  const onSubmit = (data: ObservationFormData) => {
    createObservation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
      <h3 className="text-xl font-semibold text-white">Nova Observação</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          label="Intensidade" 
          placeholder="low, moderate, high, critical" 
          error={errors.intensity?.message} 
          {...register('intensity')} 
        />
        <FormInput 
          label="Frequência" 
          placeholder="once, sometimes, frequent" 
          error={errors.frequency?.message} 
          {...register('frequency')} 
        />
      </div>

      <FormInput 
        label="Contexto" 
        placeholder="Onde aconteceu? (ex: Sala de aula, Recreio)" 
        error={errors.context?.message} 
        {...register('context')} 
      />

      {/* Using FormInput as textarea workaround since we don't have FormTextarea yet */}
      <FormInput 
        label="Descrição" 
        placeholder="Descreva o comportamento observado em detalhes..." 
        error={errors.description?.message} 
        {...register('description')} 
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="secondary" type="button" onClick={() => onSuccess?.()}>Cancelar</Button>
        <Button variant="primary" type="submit" isLoading={createObservation.isPending}>Salvar Observação</Button>
      </div>
    </form>
  );
}
