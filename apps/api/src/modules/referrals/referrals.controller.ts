import { Controller, Post, Get, Param, Body, UseGuards, Patch } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('referrals')
@UseGuards(JwtAuthGuard)
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get()
  findAll() {
    return this.referralsService.findAll();
  }

  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.referralsService.create(body, user.id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @CurrentUser() user: any) {
    return this.referralsService.updateStatus(id, status, user.id);
  }
}
