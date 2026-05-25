import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { TenantGuard } from '../modules/auth/guards/tenant.guard';
import { CurrentUser } from '../modules/auth/decorators/current-user.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard, TenantGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('students_list')
  @CacheTTL(30000)
  findAll(@CurrentUser() user: any) {
    return this.studentsService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.findOne(id, user.tenantId);
  }
}
