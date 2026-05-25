import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PdfService } from './pdf/pdf.service';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private pdfService: PdfService
  ) {}

  async generateStudentReport(studentId: string, tenantId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, tenantId },
      include: {
        observations: { orderBy: { createdAt: 'desc' }, take: 10 },
        assessmentSessions: { orderBy: { createdAt: 'desc' }, include: { template: true } }
      }
    });

    if (!student) throw new NotFoundException('Student not found');

    const pdfBuffer = await this.pdfService.generateReport({
      title: 'Evolução e Monitoramento',
      studentName: student.fullName,
      riskLevel: student.riskLevel,
      observations: student.observations,
      assessments: student.assessmentSessions,
      recommendations: [
        'Acompanhamento contínuo recomendado.',
        'Notificar responsáveis sobre as observações recentes.'
      ]
    });

    return pdfBuffer;
  }

  async getSchoolAnalytics(tenantId: string) {
    // Aggregate data for dashboards
    const riskDistribution = await this.prisma.student.groupBy({
      by: ['riskLevel'],
      where: { tenantId },
      _count: {
        riskLevel: true,
      },
    });

    const activeReferrals = await this.prisma.referral.count({
      where: { student: { tenantId }, status: { not: 'CLOSED' } }
    });

    return {
      riskDistribution,
      activeReferrals,
    };
  }
}
