import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface Student {
  id: string;
  fullName: string;
  birthDate: string;
  gender: string;
  status: string;
  riskLevel: string;
  notes: string;
  tags: string;
  createdAt: string;
  school: { name: string };
  classroom: { name: string } | null;
  observations: any[];
  referrals: any[];
  assessmentSessions: any[];
}

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const { data } = await apiClient.get<Student[]>('/students');
      return data;
    },
  });
};

export const useStudent = (id: string) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Student>(`/students/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
