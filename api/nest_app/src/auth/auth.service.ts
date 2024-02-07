import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Jwt, Msg } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // ユーザー作成
  async signUp(postData): Promise<Msg> {
    const hashed = await bcrypt.hash(postData.password, 12);
    try {
      await this.prismaService.user.create({
        data: {
          email: postData.email,
          hashedPassword: hashed,
        },
      });
      return { message: 'ok' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This email is already taken.');
        }
      }
    }
  }

  // ログイン認証
  async login(postData) {
    const user = await this.prismaService.user.findUnique({
      where: { email: postData.email },
    });
    if (!user) throw new ForbiddenException('Email or password incorrect');
    const isValid = await bcrypt.compare(postData.password, user.hashedPassword);
    if (!isValid) throw new ForbiddenException('Email or password incorrect');
    return this.generateJwt(user.id, user.email);
  }

  // パスワード変更(余力で)

  // トークン作成
  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
      secret: secret,
    });
    return { accessToken: token };
  }
}
