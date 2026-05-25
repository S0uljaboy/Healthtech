import { Injectable } from '@nestjs/common';

@Injectable()
export class VisibilityService {
  
  filterForParent(studentData: any) {
    // Parents cannot see critical internal notes or raw assessment scores, only interpretations
    // They cannot see teacher names on observations, only the event
    
    const sanitizedObservations = studentData.observations?.map((obs: any) => ({
      ...obs,
      teacherId: undefined, // hide teacher
      intensity: undefined, // hide internal rating
    })) || [];

    const sanitizedAssessments = studentData.assessmentSessions?.map((sess: any) => ({
      ...sess,
      score: undefined, // hide raw score
      answers: undefined, // hide individual answers
    })) || [];

    return {
      ...studentData,
      riskLevel: undefined, // Parents shouldn't see internal risk level directly, maybe a simplified version
      status: 'Acompanhamento Ativo',
      observations: sanitizedObservations,
      assessmentSessions: sanitizedAssessments,
    };
  }

  filterForClinical(studentData: any) {
    // Psychologists see everything
    return studentData;
  }

  filterForInternal(studentData: any) {
    // Teachers see observations and simplified assessment results, but not clinical notes
    const sanitizedAssessments = studentData.assessmentSessions?.map((sess: any) => ({
      id: sess.id,
      status: sess.status,
      completedAt: sess.completedAt,
      templateName: sess.template?.name,
    })) || [];

    return {
      ...studentData,
      assessmentSessions: sanitizedAssessments,
    };
  }
}
