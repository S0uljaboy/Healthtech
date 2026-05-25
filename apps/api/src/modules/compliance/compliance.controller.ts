import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { Request } from 'express';

@Controller('compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('audit')
  async logAudit(
    @Body() body: { action: string; resource: string; resourceId?: string; details?: any },
    @CurrentUser() user: any,
    @Req() req: Request
  ) {
    const ipAddress = req.ip;
    return this.complianceService.logAudit(
      user.id,
      body.action,
      body.resource,
      body.resourceId,
      body.details,
      ipAddress
    );
  }

  @Get('audit')
  async getAuditLogs(@CurrentUser() user: any) {
    // Basic RBAC could be applied here
    return this.complianceService.getAuditLogs(user.role === 'ADMIN' ? undefined : user.id);
  }

  @Post('consents')
  async grantConsent(
    @Body() body: { studentId: string; type: string },
    @CurrentUser() user: any,
    @Req() req: Request
  ) {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];
    return this.complianceService.grantConsent(
      body.studentId,
      user.id,
      body.type,
      ipAddress,
      userAgent
    );
  }

  @Post('consents/:id/revoke')
  async revokeConsent(@Param('id') id: string) {
    return this.complianceService.revokeConsent(id);
  }

  @Get('students/:id/consents')
  async getConsents(@Param('id') id: string) {
    return this.complianceService.getConsents(id);
  }
}
