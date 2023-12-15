import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASK_PACKAGE_NAME } from 'src/types/task';
import { TASK_SERVICE } from '../constants/packages';
import { TasksController } from './tasks.controller';
import { TaskResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';
import {
  AuthExceptionFilter,
  ValidationExceptionFilter,
} from 'src/utils/exceptions/custom-filter.exception';

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
  providers: [
    TasksService,
    TaskResolver,
    JwtService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AuthExceptionFilter,
    },
  ],
})
export class TasksModule {}
