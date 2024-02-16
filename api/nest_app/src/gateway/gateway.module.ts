import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [Gateway, MessagesService, PrismaService],
})
export class GatewayModule {}
