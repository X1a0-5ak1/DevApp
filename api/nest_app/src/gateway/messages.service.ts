import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prismaService: PrismaService) {}

  async create(content: string, user_Id: number) {
    return await this.prismaService.message.create({
      data: {
        user_Id: user_Id,
        content: content,
      },
    });
  }

  async findAll() {
    return await this.prismaService.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
