import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { ObservationFormData } from '../schemas/observation-schema';

export const useCreateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ObservationFormData) => {
      const response = await apiClient.post('/observations', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate student query so the timeline and risk updates
      queryClient.invalidateQueries({ queryKey: ['students', variables.studentId] });
    },
  });
};
