import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['assessments', 'templates'],
    queryFn: async () => {
      const { data } = await apiClient.get('/assessments/templates');
      return data;
    },
  });
};

export const useStartSession = () => {
  return useMutation({
    mutationFn: async (payload: { studentId: string; templateId: string }) => {
      const { data } = await apiClient.post('/assessments/start', payload);
      return data;
    },
  });
};

export const useCompleteSession = () => {
  return useMutation({
    mutationFn: async (payload: { sessionId: string; answers: any[] }) => {
      const { data } = await apiClient.post(`/assessments/${payload.sessionId}/complete`, {
        answers: payload.answers,
      });
      return data;
    },
  });
};
