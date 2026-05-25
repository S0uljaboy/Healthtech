import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReferralsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { studentId: string; reason: string; notes?: string }, teacherId: string) {
    return this.prisma.referral.create({
      data: {
        studentId: data.studentId,
        teacherId,
        reason: data.reason,
        notes: data.notes,
        status: 'PENDING',
      },
    });
  }

  async updateStatus(id: string, status: string, psychologistId: string) {
    return this.prisma.referral.update({
      where: { id },
      data: { status, psychologistId },
    });
  }

  async findAll() {
    return this.prisma.referral.findMany({
      include: {
        student: { select: { fullName: true, riskLevel: true } },
        teacher: { select: { name: true } },
        psychologist: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
