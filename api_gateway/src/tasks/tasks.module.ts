import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASK_SERVICE } from '../constants/packages';
import { TASK_PACKAGE_NAME } from './types/task';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TASK_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: TASK_PACKAGE_NAME,
          protoPath: 'src/proto/task.proto',
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
