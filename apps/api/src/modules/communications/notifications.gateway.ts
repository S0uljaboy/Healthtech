import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  // Map of userId to socketId
  private userSockets: Map<string, string[]> = new Map();

  handleConnection(client: Socket) {
    // In a real scenario, we extract the token from client.handshake.auth.token
    // For now, we expect the client to emit 'authenticate' with their userId
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Remove socket from user mapping
    for (const [userId, sockets] of this.userSockets.entries()) {
      const index = sockets.indexOf(client.id);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.userSockets.delete(userId);
        }
        break;
      }
    }
  }

  @SubscribeMessage('authenticate')
  handleAuthenticate(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    const { userId } = data;
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }
    this.userSockets.get(userId)?.push(client.id);
    this.logger.log(`User ${userId} authenticated on socket ${client.id}`);
    return { event: 'authenticated', data: { success: true } };
  }

  notifyUser(userId: string, payload: any) {
    const sockets = this.userSockets.get(userId);
    if (sockets && sockets.length > 0) {
      sockets.forEach((socketId) => {
        this.server.to(socketId).emit('notification', payload);
      });
      this.logger.log(`Notification sent to User ${userId}`);
    } else {
      this.logger.log(`User ${userId} is offline. Notification not sent via WS.`);
    }
  }

  broadcast(payload: any) {
    this.server.emit('notification', payload);
  }
}
