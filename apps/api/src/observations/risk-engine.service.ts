import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RiskEngineService {
  constructor(private prisma: PrismaService) {}

  async calculateRisk(studentId: string, tenantId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, tenantId },
      include: {
        observations: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        },
      },
    });

    if (!student || student.observations.length === 0) return 'neutral';

    let score = 0;
    
    // Intensity multiplier
    const intensityMap: Record<string, number> = {
      low: 1,
      moderate: 2,
      high: 4,
      critical: 8,
    };

    // Recurrence (if more than 3 observations in 14 days, multiply)
    const recentObs = student.observations.filter(o => 
      o.createdAt > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    );

    student.observations.forEach(obs => {
      score += intensityMap[obs.intensity] || 1;
    });

    if (recentObs.length >= 3) {
      score *= 1.5; // Recurrence multiplier
    }

    // Assign risk level based on score
    if (score >= 20) return 'critical';
    if (score >= 10) return 'high';
    if (score >= 5) return 'medium';
    return 'low';
  }

  async updateStudentRisk(studentId: string, tenantId: string) {
    const newRisk = await this.calculateRisk(studentId, tenantId);
    
    await this.prisma.student.update({
      where: { id: studentId },
      data: { riskLevel: newRisk },
    });

    return newRisk;
  }
}
