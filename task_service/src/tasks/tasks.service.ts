import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  IAuthReponse,
} from './types/auth';
import {
  ICreateTaskDto,
  IGetTaskUserDto,
  ITask,
  ITaskReponse,
} from './types/task';
import { toFormatResponse } from './utils/commonFunctions';
import { RESPONSE_MESSAGES } from './utils/constants/messages';
import {
  HttpStatusConstants,
  HttpStatusMessages,
} from './utils/constants/statusCode';
import { CustomException } from './utils/exceptions/customException';

@Injectable()
export class TasksService {
  private authService: AuthServiceClient;

  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<ITask>,
    @Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  /**
   * Inject service from services
   */
  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async getTasks(getTaskUserDto: IGetTaskUserDto): Promise<ITaskReponse> {
    if (!getTaskUserDto.userId) {
      throw new CustomException(
        HttpStatusMessages[HttpStatusConstants.USER_ID_REQUIRED],
        HttpStatusConstants.USER_ID_REQUIRED,
      );
    }
    // const user: IAuthReponse = await lastValueFrom(
    //   this.authService.findOneUser({ id: `${getTaskUserDto.userId}` }),
    // );
    // console.log('user: ', user);
    // if (!user.data.user) {
    //   throw new CustomException(
    //     HttpStatusMessages[HttpStatusConstants.USER_NOT_EXISTED],
    //     HttpStatusConstants.USER_NOT_EXISTED,
    //   );
    // }
    const tasksList: ITask[] = await this.tasksRepository.find({
      where: {
        user: { id: getTaskUserDto.userId },
      },
    });
    const mapTaskModel: ITaskReponse = toFormatResponse(
      tasksList,
      null,
      RESPONSE_MESSAGES.GET_TASK_LIST_SUCCESS,
      false,
    );
    return mapTaskModel;
  }

  /**
   * The service find the task with the givin task's id
   * @param id hold the id of the task
   * @returns the founded task
   */
  async getTaskById(id: number): Promise<ITaskReponse> {
    try {
      const task: ITask = await this.tasksRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      return toFormatResponse([task], null, '', false);
    } catch (error) {
      // Handle the case where no task is found
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      // Rethrow other errors
      throw error;
    }
  }

  /**
   * The service create new task
   * @param createTaskDto hold data for new task information
   * @returns new created task
   */
  async createTask(createTaskDto: ICreateTaskDto): Promise<ITaskReponse> {
    if (!createTaskDto.userId) {
      throw new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED);
    }
    const user: IAuthReponse = await lastValueFrom(
      this.authService.findOneUser({ id: `${createTaskDto.userId}` }),
    );
    if (!user.data.user) {
      throw new CustomException(
        HttpStatusMessages[HttpStatusConstants.USER_NOT_EXISTED],
        HttpStatusConstants.USER_NOT_EXISTED,
      );
    }
    if (
      !createTaskDto.dueDate ||
      !createTaskDto.status ||
      !createTaskDto.title
    ) {
      throw new CustomException(RESPONSE_MESSAGES.ALL_FIELD_REQUIRED);
    }
    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate:
        createTaskDto.dueDate !== '' ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status,
    } as ITask;
    const task: ITask = await this.tasksRepository.create(newTask);
    const savedSingleTask: ITask = await this.tasksRepository.save(task);

    const newCreatedTask: ITaskReponse = await this.getTaskById(
      savedSingleTask.id,
    );

    // Format response
    const newTaskResponse: ITaskReponse = toFormatResponse(
      newCreatedTask.data,
      null,
      '',
      false,
    );
    return newTaskResponse;
  }

  mapTaskEntityToInterface = (task: ITask) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      createdAt: task.createdAt,
    } as ITask;
  };
}
