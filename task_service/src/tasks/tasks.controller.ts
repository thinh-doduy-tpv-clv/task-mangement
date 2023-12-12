import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  ITask,
  ITaskReponse,
  IUpdateTaskDto,
  TasksServiceController,
  TasksServiceControllerMethods,
} from './types/task';
import { toFormatResponse } from './utils/commonFunctions';
import { GrpcExceptionFilter } from './utils/exceptions/exceptionHandler';
import { Task } from './entities/task.entity';

@Controller('tasks')
@TasksServiceControllerMethods()
@UseFilters(new GrpcExceptionFilter())
export class TasksController implements TasksServiceController {
  constructor(private readonly tasksService: TasksService) {}

  async findOneTask(request: IFindOneTaskDto): Promise<ITaskReponse> {
    const result: ITask = await this.tasksService.getTaskById(request.id);
    return toFormatResponse(result);
  }
  updateTask(
    request: IUpdateTaskDto,
  ): ITaskReponse | Promise<ITaskReponse> | Observable<ITaskReponse> {
    throw new Error('Method not implemented.');
  }
  removeTask(
    request: IFindOneTaskDto,
  ): ITaskReponse | Promise<ITaskReponse> | Observable<ITaskReponse> {
    throw new Error('Method not implemented.');
  }

  // TODO: Implement create new task
  async createTask(createTaskDto: ICreateTaskDto): Promise<ITaskReponse> {
    const result: ITask = await this.tasksService.createTask(createTaskDto);
    return toFormatResponse(result);
  }

  async findAllTask() {
    return null;
  }
}
