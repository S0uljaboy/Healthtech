import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async logAudit(userId: string, action: string, resource: string, resourceId?: string, details?: any, ipAddress?: string) {
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
      }
    });
  }

  async getAuditLogs(userId?: string) {
    // In real app, only admins could query all, otherwise limit by user
    return this.prisma.auditLog.findMany({
      where: userId ? { userId } : {},
      include: { user: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  async grantConsent(studentId: string, grantedById: string, type: string, ipAddress?: string, userAgent?: string) {
    return this.prisma.consent.create({
      data: {
        studentId,
        grantedById,
        type,
        status: 'GRANTED',
        ipAddress,
        userAgent
      }
    });
  }

  async revokeConsent(consentId: string) {
    return this.prisma.consent.update({
      where: { id: consentId },
      data: { status: 'REVOKED' }
    });
  }

  async getConsents(studentId: string) {
    return this.prisma.consent.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
