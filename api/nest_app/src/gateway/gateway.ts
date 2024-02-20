import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected!');
    });
  }

  @SubscribeMessage('loadMessage')
  async onLoadMessage() {
    const messageHistories = await this.prismaService.message.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
    console.log(messageHistories);
    this.server.emit('onMessage', {
      messageHistories,
      msg: 'Load latest 50',
    });
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any, user_Id: number) {
    console.log(body);
    try {
      this.prismaService.message.create({
        data: {
          user_Id: user_Id,
          content: body,
        },
      });
    } catch (error) {
      console.log(error);
    }
    const loadMessage = await this.prismaService.message.findMany({
      where: {
        user_Id: user_Id,
        content: body,
      },
    });
    console.log(loadMessage);
    this.server.emit('onMessage', {
      loadMessage,
      msg: 'New Message',
    });
  }
}
