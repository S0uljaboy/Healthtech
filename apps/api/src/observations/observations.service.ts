import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RiskEngineService } from './risk-engine.service';

@Injectable()
export class ObservationsService {
  constructor(
    private prisma: PrismaService,
    private riskEngine: RiskEngineService
  ) {}

  async create(data: any, tenantId: string) {
    const obs = await this.prisma.observation.create({
      data: {
        description: data.description,
        intensity: data.intensity,
        frequency: data.frequency,
        context: data.context,
        studentId: data.studentId,
        tags: data.tags || [],
      },
    });

    // Update risk after new observation
    await this.riskEngine.updateStudentRisk(data.studentId, tenantId);

    return obs;
  }

  async findAllByStudent(studentId: string, tenantId: string) {
    return this.prisma.observation.findMany({
      where: {
        studentId,
        student: {
          tenantId,
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
