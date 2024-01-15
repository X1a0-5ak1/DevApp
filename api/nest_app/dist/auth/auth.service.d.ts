import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Jwt, Msg } from './interfaces/auth.interface';
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    signUp(postData: any): Promise<Msg>;
    login(postData: any): Promise<Jwt>;
    generateJwt(userId: number, email: string): Promise<Jwt>;
}
