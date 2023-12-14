import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TASK } from './constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:9001',
        protoPath: 'src/tasks/proto/task.proto',
        package: TASK,
      },
    },
  );
  await app.listen();
}
bootstrap();
