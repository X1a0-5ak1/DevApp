import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
export declare class Gateway {
    private messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    onNewMessage(client: any, payload: {
        content: string;
        user_Id: number;
    }): Promise<void>;
}
