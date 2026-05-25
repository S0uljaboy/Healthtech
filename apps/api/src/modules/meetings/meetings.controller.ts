import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('meetings')
@UseGuards(JwtAuthGuard)
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async createMeeting(
    @Body() body: { participantId: string; title: string; scheduledFor: string; studentId?: string; description?: string },
    @CurrentUser() user: any
  ) {
    return this.meetingsService.createMeeting(
      user.id,
      body.participantId,
      body.title,
      new Date(body.scheduledFor),
      body.studentId,
      body.description
    );
  }

  @Get()
  async getMeetings(@CurrentUser() user: any) {
    return this.meetingsService.getMeetings(user.id);
  }

  @Post(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string }
  ) {
    return this.meetingsService.updateMeetingStatus(id, body.status);
  }
}
