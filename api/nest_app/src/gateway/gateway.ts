import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class Gateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('newMessage')
  async onNewMessage(client: any, payload: { content: string; user_Id: number }) {
    const message = await this.messagesService.create(payload.content, payload.user_Id);
    this.server.emit('onMessage', message);
  }
}
