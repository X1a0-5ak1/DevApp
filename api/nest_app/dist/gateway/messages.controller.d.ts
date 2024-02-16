import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findAll(): Promise<{
        id: number;
        user_Id: number;
        createdAt: Date;
        content: string;
    }[]>;
}
