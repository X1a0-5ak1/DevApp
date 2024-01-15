import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfile(req: any): any;
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        id: number;
    }[]>;
}
