import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITaskReponse,
  IUpdateTaskDto,
  TASKS_SERVICE_NAME,
  TasksServiceClient,
} from 'src/types/task';
import { TASK_SERVICE } from '../constants';
@Injectable()
export class TasksService implements OnModuleInit, TasksServiceClient {
  private tasksService: TasksServiceClient;
  constructor(@Inject(TASK_SERVICE) private client: ClientGrpc) {}

  // Create new task service call handler
  createTask(request: ICreateTaskDto): Observable<ITaskReponse> {
    return this.tasksService.createTask(request);
  }
  findAllTask(request: IGetTaskUserDto): Observable<ITaskReponse> {
    return this.tasksService.findAllTask({ userId: request.userId });
  }
  findOneTask(request: IFindOneTaskDto): Observable<ITaskReponse> {
    throw new Error('Method not implemented.');
  }
  updateTask(request: IUpdateTaskDto): Observable<ITaskReponse> {
    return this.tasksService.updateTask(request);
  }
  removeTask(request: IFindOneTaskDto): Observable<ITaskReponse> {
    throw new Error('Method not implemented.');
  }

  /**
   * Inject service from services
   */
  onModuleInit() {
    this.tasksService =
      this.client.getService<TasksServiceClient>(TASKS_SERVICE_NAME);
  }
}
