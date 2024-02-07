import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // cors設定
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin, X-Reqested-with, Content-Type, Accept', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
