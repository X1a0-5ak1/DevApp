import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class Gateway implements OnModuleInit {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    server: Server;
    onModuleInit(): void;
    onLoadMessage(): Promise<void>;
    onNewMessage(body: any, user_Id: number): Promise<void>;
}
