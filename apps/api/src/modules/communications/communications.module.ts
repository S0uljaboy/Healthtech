import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { CommunicationsService } from './communications.service';
import { CommunicationsController } from './communications.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommunicationsController],
  providers: [NotificationsGateway, CommunicationsService],
  exports: [NotificationsGateway, CommunicationsService],
})
export class CommunicationsModule {}
