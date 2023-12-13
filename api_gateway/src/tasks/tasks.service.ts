import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TASK_SERVICE } from '../constants';
import { GetTasksListDto } from './dto/get.tasklist.dto';
import {
  ITaskReponse,
  TASKS_SERVICE_NAME,
  TasksServiceClient,
} from './types/task';
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
  findAllTask(getTasksListDto: GetTasksListDto): Observable<ITaskReponse> {
    return this.tasksService.findAllTask({ userId: getTasksListDto.userId });
  }
}
