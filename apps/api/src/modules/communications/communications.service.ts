import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommunicationsService {
  constructor(
    private readonly gateway: NotificationsGateway,
    private readonly prisma: PrismaService
  ) {}

  async sendNotification(userId: string, title: string, message: string, type: 'alert' | 'info' | 'message') {
    // Save to Prisma Notification table first
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        read: false,
      }
    });
    
    // Emit it directly via websockets
    this.gateway.notifyUser(userId, notification);
    
    return notification;
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markNotificationRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllNotificationsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async sendMessage(senderId: string, recipientId: string, subject: string, body: string, studentId?: string) {
    const message = await this.prisma.message.create({
      data: {
        senderId,
        recipientId,
        subject,
        body,
        studentId,
        read: false,
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
      }
    });

    // Notify the recipient via websocket
    this.sendNotification(
      recipientId,
      'Nova Mensagem Interna',
      `${message.sender.name} enviou: ${subject}`,
      'message'
    );

    return message;
  }

  async getMessages(userId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { recipientId: userId },
          { senderId: userId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        recipient: { select: { id: true, name: true, role: true } },
        student: { select: { id: true, fullName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
