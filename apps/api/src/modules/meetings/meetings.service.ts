import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommunicationsService } from '../communications/communications.service';

@Injectable()
export class MeetingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commsService: CommunicationsService
  ) {}

  async createMeeting(organizerId: string, participantId: string, title: string, scheduledFor: Date, studentId?: string, description?: string) {
    const meeting = await this.prisma.meeting.create({
      data: {
        organizerId,
        participantId,
        studentId,
        title,
        description,
        scheduledFor,
        status: 'SCHEDULED',
        link: 'https://meet.google.com/mock-link-' + Math.random().toString(36).substring(7),
      },
      include: {
        organizer: { select: { name: true, role: true } },
      }
    });

    // Notify participant
    this.commsService.sendNotification(
      participantId,
      'Nova Reunião Agendada',
      `${meeting.organizer.name} agendou uma reunião: ${title} para ${scheduledFor.toLocaleString()}`,
      'info'
    );

    return meeting;
  }

  async getMeetings(userId: string) {
    return this.prisma.meeting.findMany({
      where: {
        OR: [
          { organizerId: userId },
          { participantId: userId }
        ]
      },
      include: {
        organizer: { select: { id: true, name: true, role: true } },
        participant: { select: { id: true, name: true, role: true } },
        student: { select: { id: true, fullName: true } }
      },
      orderBy: { scheduledFor: 'asc' }
    });
  }

  async updateMeetingStatus(id: string, status: string) {
    return this.prisma.meeting.update({
      where: { id },
      data: { status }
    });
  }
}
