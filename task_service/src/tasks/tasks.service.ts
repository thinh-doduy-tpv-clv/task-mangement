import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ICreateTaskDto, ITask } from './types/task';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<ITask>,
  ) {}

  async getTasks(): Promise<Task[]> {
    try {
      const entities: Task[] = await this.tasksRepository.find();
      return entities;
    } catch (error) {
      throw new Error('Could not fetch all tasks');
    }
  }

  /**
   * The service find the task with the givin task's id
   * @param id hold the id of the task
   * @returns the founded task
   */
  async getTaskById(id: number): Promise<ITask> {
    try {
      const task: ITask = await this.tasksRepository.findOne({
        where: { id: id },
      });
      return task;
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
    const newTask: Task = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      dueDate:
        createTaskDto.dueDate !== '' ? new Date(createTaskDto.dueDate) : null,
      status: createTaskDto.status,
    };
    const task: ITask = await this.tasksRepository.create(newTask);
    const savedSingleTask: ITask = await this.tasksRepository.save(task);

    const newCreatedTask = await this.getTaskById(savedSingleTask.id);
    return newCreatedTask;
  }
}
