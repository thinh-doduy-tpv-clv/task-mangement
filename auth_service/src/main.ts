import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH } from './constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5000',
        protoPath: 'src/proto/auth.proto',
        package: AUTH,
        //url: 'http://localhost:5559',
      },
    },
  );
  await app.listen();
}
bootstrap();
