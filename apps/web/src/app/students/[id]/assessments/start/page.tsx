import { AssessmentFlowView } from '@/features/assessments/AssessmentFlowView';

export default function AssessmentStartPage({ params }: { params: { id: string } }) {
  return <AssessmentFlowView studentId={params.id} />;
}
