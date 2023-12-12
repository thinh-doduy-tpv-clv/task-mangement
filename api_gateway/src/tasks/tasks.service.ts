import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { TASKS_SERVICE_NAME, Tasks, TasksServiceClient } from './types/task';
import { TASK_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class TasksService implements OnModuleInit {

  private tasksService: TasksServiceClient;
  constructor(@Inject(TASK_SERVICE) private client: ClientGrpc) {}

  /**
   * Inject service from services
   */
  onModuleInit() {
    this.tasksService =
      this.client.getService<TasksServiceClient>(TASKS_SERVICE_NAME);
  }

  /**
   * 
   * @returns 
   */
  findAllTask(): Observable<Tasks> {
    return this.tasksService.findAllTask({});
  }
}
