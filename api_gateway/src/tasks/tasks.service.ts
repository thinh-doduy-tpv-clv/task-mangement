import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TASKS_SERVICE_NAME, TasksServiceClient } from './types/task';
import { TASK_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
@Injectable()
export class TasksService implements OnModuleInit {
  private tasksService: TasksServiceClient;
  constructor(@Inject(TASK_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.tasksService =
      this.client.getService<TasksServiceClient>(TASKS_SERVICE_NAME);
  }
  findAllTask() {
    return this.tasksService.findAllTask({});
  }
}
