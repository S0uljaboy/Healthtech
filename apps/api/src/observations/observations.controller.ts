import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { TenantGuard } from '../modules/auth/guards/tenant.guard';
import { CurrentUser } from '../modules/auth/decorators/current-user.decorator';

@Controller('observations')
@UseGuards(JwtAuthGuard, TenantGuard)
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.observationsService.create(body, user.tenantId);
  }

  @Get('student/:studentId')
  findAllByStudent(@Param('studentId') studentId: string, @CurrentUser() user: any) {
    return this.observationsService.findAllByStudent(studentId, user.tenantId);
  }
}
