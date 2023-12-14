import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, TASK_SERVICE } from '../constants/packages';
import { TaskResolver } from './tasks.resolver';
import { TASK_PACKAGE_NAME } from 'src/types/task';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_PACKAGE_NAME } from 'src/types/auth';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: TASK_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:9000',
          package: TASK_PACKAGE_NAME,
          protoPath: 'src/proto/task.proto',
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskResolver, JwtService],
})
export class TasksModule {}
