import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { Response } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('analytics')
  getAnalytics(@CurrentUser() user: any) {
    return this.reportsService.getSchoolAnalytics(user.tenantId);
  }

  @Get('student/:id/pdf')
  async downloadStudentReport(@Param('id') id: string, @CurrentUser() user: any, @Res() res: Response) {
    const buffer = await this.reportsService.generateStudentReport(id, user.tenantId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=report-${id}.pdf`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
