import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.student.findMany({
      where: { tenantId },
      include: {
        school: true,
        classroom: true,
      },
    });
  }

  async findOne(id: string, tenantId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id, tenantId },
      include: {
        school: true,
        classroom: true,
        observations: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        referrals: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        assessmentSessions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: { template: true },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(`Student ${id} not found in this tenant`);
    }

    return student;
  }
}
