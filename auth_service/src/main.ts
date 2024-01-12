import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaClientConfig } from 'utils/kafka-client-config';
import { AppModule } from './app.module';
import { grpcClientConfig } from 'utils/grpc-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientConfig);
  app.connectMicroservice<MicroserviceOptions>(kafkaClientConfig);
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  app.listen(null);
}
bootstrap();
