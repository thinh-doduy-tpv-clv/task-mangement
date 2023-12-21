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
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITask,
  ITaskReponse,
  IUpdateTaskDto,
} from './types/task';
import { toFormatResponse } from './utils/commonFunctions';
import { TASK_STATUS } from './utils/constants/constants';
import { RESPONSE_MESSAGES } from './utils/constants/messages';
import {
  HttpStatusConstants,
  HttpStatusMessages,
} from './utils/constants/statusCode';
import { CustomException } from './utils/exceptions/customException';

@Injectable()
export class TasksService {
  private authService: AuthServiceClient;
  get _authService(): AuthServiceClient {
    return this.authService;
  }
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

  // [ ]: Get task list
  async getTasks(getTaskUserDto: IGetTaskUserDto): Promise<ITaskReponse> {
    if (!getTaskUserDto || !getTaskUserDto.userId) {
      throw new CustomException(
        HttpStatusMessages[HttpStatusConstants.USER_ID_REQUIRED],
        HttpStatusConstants.USER_ID_REQUIRED,
      );
    }
    const user: IAuthReponse = await lastValueFrom(
      this.authService.findOneUser({ id: `${getTaskUserDto.userId}` }),
    );
    if (!user.data || !user.data?.user) {
      throw new CustomException(
        HttpStatusMessages[HttpStatusConstants.USER_NOT_EXISTED],
        HttpStatusConstants.USER_NOT_EXISTED,
      );
    }
    const tasksList: ITask[] = await this.tasksRepository.find({
      where: {
        user: { id: getTaskUserDto.userId },
      },
      order: {
        createdAt: 'DESC',
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
  async getTaskById(taskId: number, userId: number): Promise<ITaskReponse> {
    try {
      const task: ITask = await this.tasksRepository
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user') // Assuming the property in User entity for the many-to-many relation is named 'roles'
        .where('task.id = :taskId', { taskId })
        .andWhere('user.id = :userId', { userId })
        .getOne();
      return toFormatResponse([task], null, '', false);
    } catch (error) {
      // Handle the case where no task is found
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
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
    if (!createTaskDto || !createTaskDto.userId) {
      throw new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED);
    }
    const currentUser: IAuthReponse = await lastValueFrom(
      this.authService.findOneUser({ id: `${createTaskDto.userId}` }),
    );
    if (!currentUser.data || !currentUser.data.user) {
      throw new CustomException(
        HttpStatusMessages[HttpStatusConstants.USER_NOT_EXISTED],
        HttpStatusConstants.USER_NOT_EXISTED,
      );
    }
    if (!createTaskDto.status || !createTaskDto.title) {
      throw new CustomException(RESPONSE_MESSAGES.ALL_FIELD_REQUIRED);
    }
    const newTask = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate:
        createTaskDto.dueDate !== null ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status,
      user: { id: createTaskDto.userId },
    } as ITask;

    const task: ITask = await this.tasksRepository.create(newTask);
    const savedTask: ITask = await this.tasksRepository.save(task);
    const newCreatedTask: ITaskReponse = await this.getTaskById(
      savedTask.id,
      createTaskDto.userId,
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

  async updateTask(updateTaskDto: IUpdateTaskDto): Promise<ITaskReponse> {
    if (!updateTaskDto || !updateTaskDto.id) {
      throw new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED);
    }
    if (!updateTaskDto || !updateTaskDto.userId) {
      throw new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED);
    }
    if (
      !Object.values(TASK_STATUS).includes(updateTaskDto.status as TASK_STATUS)
    ) {
      throw new CustomException(RESPONSE_MESSAGES.TASK_STATUS_INVALID);
    }
    // Retrieve information for user & task
    const currentUser: IAuthReponse = await lastValueFrom(
      this.authService.findOneUser({ id: `${updateTaskDto.userId}` }),
    );
    if (!currentUser) {
      throw new CustomException(RESPONSE_MESSAGES.USER_NOT_EXISTED);
    }
    const currentTaskResponse: ITaskReponse = await this.getTaskById(
      updateTaskDto.id,
      updateTaskDto.userId,
    );
    let currentTask: ITask = currentTaskResponse?.data[0];

    if (!currentTask) {
      throw new CustomException(RESPONSE_MESSAGES.TASK_NOT_FOUND);
    }

    // Update task info
    currentTask = {
      ...currentTask,
      description: updateTaskDto.description,
      dueDate: updateTaskDto.dueDate,
      status: updateTaskDto.status,
      title: updateTaskDto.title,
    };
    await this.tasksRepository.save(currentTask);
    const updatedTaskData: ITaskReponse = await this.getTaskById(
      updateTaskDto.id,
      updateTaskDto.userId,
    );
    console.log('Service01', updatedTaskData);

    // Format response
    const updatedTask: ITaskReponse = toFormatResponse(
      updatedTaskData.data,
      null,
      '',
      false,
    );
    console.log('Service', updatedTask);

    return updatedTask;
  }

  async removeTaskById(findTaskDto: IFindOneTaskDto): Promise<ITaskReponse> {
    if (!findTaskDto.id) {
      throw new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED);
    }
    if (!findTaskDto.userId) {
      throw new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED);
    }
    // Retrieve information for user & task
    const currentUser: IAuthReponse = await lastValueFrom(
      this.authService.findOneUser({ id: `${findTaskDto.userId}` }),
    );
    if (!currentUser) {
      throw new CustomException(RESPONSE_MESSAGES.USER_NOT_EXISTED);
    }
    const currentTaskResponse: ITaskReponse = await this.getTaskById(
      findTaskDto.id,
      findTaskDto.userId,
    );
    const currentTask: ITask = currentTaskResponse?.data[0];

    if (!currentTask) {
      throw new CustomException(RESPONSE_MESSAGES.TASK_NOT_FOUND);
    }
    if (currentTask.status === TASK_STATUS.ARCHIVED) {
      throw new CustomException(
        RESPONSE_MESSAGES.TASK_ARCHIVED_CANNOT_BE_DELETED,
      );
    }

    await this.tasksRepository.remove(currentTask);
    const removedTask: ITaskReponse = toFormatResponse(
      [{ ...currentTask, id: findTaskDto.id }],
      null,
      '',
      false,
    );
    return removedTask;
  }

  // mapTaskEntityToInterface = (task: ITask) => {
  //   return {
  //     id: task.id || 0,
  //     title: task.title || '',
  //     description: task.description || '',
  //     dueDate: task.dueDate || null,
  //     status: task.status || '',
  //     createdAt: task.createdAt || null,
  //   } as ITask;
  // };
}
