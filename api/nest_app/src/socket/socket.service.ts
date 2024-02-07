import { ConnectedSocket, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketService implements OnGatewayConnection {
  @SubscribeMessage('server-patch')
  handleEvent(dto: any, @ConnectedSocket() client: any) {
    const res = { type: 'sameType', dto };
    client.emit('client-path', res);
  }

  handleConnection(client: any) {
    console.log(client);
    console.log('CONNECTED');
  }
}
