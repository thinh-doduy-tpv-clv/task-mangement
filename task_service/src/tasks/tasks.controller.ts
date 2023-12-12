import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITask,
  ITaskReponse,
  ITasks,
  IUpdateTaskDto,
  TasksServiceController,
  TasksServiceControllerMethods,
} from './types/task';
import { toFormatResponse } from './utils/commonFunctions';
import { GrpcExceptionFilter } from './utils/exceptions/exceptionHandler';
import { RESPONSE_MESSAGES } from './utils/constants/messages';

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

  async findAllTask(getTaskUserDto: IGetTaskUserDto): Promise<ITaskReponse> {
    try {
      const result: ITasks = await this.tasksService.getTasks(getTaskUserDto);
      return toFormatResponse(
        { tasks: result },
        RESPONSE_MESSAGES.GET_TASK_LIST_SUCCESS,
      );
    } catch (err) {
      console.log('err: ', err.message);
      return toFormatResponse({ tasks: [] }, err.message, true);
    }
  }
}
