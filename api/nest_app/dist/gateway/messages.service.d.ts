import { PrismaService } from 'src/prisma/prisma.service';
export declare class MessagesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(content: string, user_Id: number): Promise<{
        id: number;
        user_Id: number;
        createdAt: Date;
        content: string;
    }>;
    findAll(): Promise<{
        id: number;
        user_Id: number;
        createdAt: Date;
        content: string;
    }[]>;
}
