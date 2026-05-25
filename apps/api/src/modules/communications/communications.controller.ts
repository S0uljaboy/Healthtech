import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('communications')
@UseGuards(JwtAuthGuard)
export class CommunicationsController {
  constructor(private readonly commsService: CommunicationsService) {}

  @Post('messages')
  async sendMessage(
    @Body() body: { recipientId: string; subject: string; message: string; studentId?: string },
    @CurrentUser() user: any
  ) {
    return this.commsService.sendMessage(
      user.id,
      body.recipientId, 
      body.subject, 
      body.message,
      body.studentId
    );
  }

  @Get('messages')
  async getMessages(@CurrentUser() user: any) {
    return this.commsService.getMessages(user.id);
  }

  @Post('alerts')
  sendAlert(
    @Body() body: { studentId: string; message: string },
    @CurrentUser() user: any
  ) {
    // Alert could be sent to school admins or psychologists
    // For now we just mock sending it to the current user to see the real-time effect
    return this.commsService.sendNotification(
      user.id, 
      'Alerta de Risco', 
      body.message, 
      'alert'
    );
  }

  @Get('notifications')
  async getNotifications(@CurrentUser() user: any) {
    return this.commsService.getNotifications(user.id);
  }

  @Post('notifications/:id/read')
  async markNotificationRead(@Param('id') id: string) {
    return this.commsService.markNotificationRead(id);
  }

  @Post('notifications/read-all')
  async markAllNotificationsRead(@CurrentUser() user: any) {
    return this.commsService.markAllNotificationsRead(user.id);
  }
}
