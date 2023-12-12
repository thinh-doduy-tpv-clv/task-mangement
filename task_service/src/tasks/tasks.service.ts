import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ICreateTaskDto, IGetTaskUserDto, ITask, ITasks } from './types/task';
import { RESPONSE_MESSAGES } from './utils/constants/messages';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  async getTasks(getTaskUserDto: IGetTaskUserDto): Promise<ITasks> {
    if (!getTaskUserDto.userId) {
      throw new NotFoundException(RESPONSE_MESSAGES.USER_ID_REQUIRED);
    }
    // TODO: Check if user is existed
    const tasksList: Task[] = await this.tasksRepository.find({
      where: {
        user: { id: getTaskUserDto.userId },
      },
    });
    const mapTaskModel: ITask[] = this.mapTaskEntityToInterface(tasksList);
    return { tasks: mapTaskModel } as ITasks;
  }

  /**
   * The service find the task with the givin task's id
   * @param id hold the id of the task
   * @returns the founded task
   */
  async getTaskById(id: number): Promise<ITask> {
    try {
      const task: Task = await this.tasksRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      return {} as ITask;
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
  async createTask(createTaskDto: ICreateTaskDto): Promise<ITask> {
    if (
      !createTaskDto.description ||
      !createTaskDto.dueDate ||
      !createTaskDto.status ||
      !createTaskDto.title
    ) {
      throw new UnprocessableEntityException(
        'Provide all necessary fields for new task',
      );
    }
    let newTask: Task = new Task();
    newTask = {
      ...newTask,
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate:
        createTaskDto.dueDate !== '' ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status,
    };
    const task: Task = await this.tasksRepository.create(newTask);
    const savedSingleTask: Task = await this.tasksRepository.save(task);

    const newCreatedTask = await this.getTaskById(savedSingleTask.id);
    return {} as ITask;
  }

  mapTaskEntityToInterface = (tasks: Task[]) => {
    return tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        createdAt: task.createdAt,
      } as ITask;
    });
  };
}
