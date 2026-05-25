import { StudentProfileView } from '@/features/students/StudentProfileView';

export default function StudentPage({ params }: { params: { id: string } }) {
  return <StudentProfileView studentId={params.id} />;
}
