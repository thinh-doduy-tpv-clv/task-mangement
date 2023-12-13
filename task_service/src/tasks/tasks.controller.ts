import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITaskReponse,
  IUpdateTaskDto,
  TasksServiceController,
  TasksServiceControllerMethods,
} from './types/task';
import { toFormatResponse } from './utils/commonFunctions';
import { GrpcExceptionFilter } from './utils/exceptions/exceptionHandler';

@Controller('tasks')
@TasksServiceControllerMethods()
@UseFilters(new GrpcExceptionFilter())
export class TasksController implements TasksServiceController {
  constructor(private readonly tasksService: TasksService) {}

  async findOneTask(request: IFindOneTaskDto): Promise<ITaskReponse> {
    try {
      return await this.tasksService.getTaskById(request.id);
    } catch (err) {
      return toFormatResponse(
        [],
        { errorCode: err.statusCode, errorMsg: err.message },
        '',
        true,
      );
    }
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
    try {
      return await this.tasksService.createTask(createTaskDto);
    } catch (err) {
      return toFormatResponse(
        [],
        { errorCode: err.statusCode, errorMsg: err.message },
        '',
        true,
      );
    }
  }

  async findAllTask(getTaskUserDto: IGetTaskUserDto): Promise<ITaskReponse> {
    try {
      const result: ITaskReponse = await this.tasksService.getTasks(
        getTaskUserDto,
      );
      return result;
    } catch (err) {
      console.log('err: ', err);
      return toFormatResponse(
        [],
        { errorCode: err?.status, errorMsg: err.response?.message },
        '',
        true,
      );
    }
  }
}
