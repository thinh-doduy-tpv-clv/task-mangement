import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITask,
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
    return await this.tasksService.getTaskById(request.id, request.userId);
  }
  async updateTask(request: IUpdateTaskDto): Promise<ITaskReponse> {
    try {
      const updatedTask: ITaskReponse = await this.tasksService.updateTask(
        request,
      );
      return updatedTask;
    } catch (err) {
      return toFormatResponse(
        [],
        { errorCode: err.statusCode, errorMsg: err.message },
        '',
        true,
      );
    }
  }
  async removeTask(request: IFindOneTaskDto): Promise<ITaskReponse> {
    try {
      const ITaskResponse = await this.tasksService.removeTaskById(request);
      return ITaskResponse;
    } catch (err) {
      return toFormatResponse(
        [],
        { errorCode: err.statusCode, errorMsg: err.message },
        '',
        true,
      );
    }
  }

  async createTask(createTaskDto: ICreateTaskDto): Promise<ITaskReponse> {
    const ITaskResponse = await this.tasksService.createTask(createTaskDto);
    return ITaskResponse;
  }

  async findAllTask(getTaskUserDto: IGetTaskUserDto): Promise<ITaskReponse> {
    const result: ITaskReponse = await this.tasksService.getTasks(
      getTaskUserDto,
    );
    return result;
  }
}
