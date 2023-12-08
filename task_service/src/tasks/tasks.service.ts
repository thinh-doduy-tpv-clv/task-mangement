import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import {
  CreateTaskDto,
  UpdateTaskDto,
  FindOneTaskDto,
  Tasks as TasksProto,
  Task as TaskProto,
} from './types/task';
import { CreateTaskDtoImpl } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<TaskProto>,
  ) {}
  async getTasks(): Promise<TasksProto> {
    try {
      const entities = await this.tasksRepository.find();
      return { tasks: entities };
    } catch (error) {
      throw new Error('Could not fetch all tasks');
    }
  }
  async getTaskById(id: number): Promise<Task | undefined> {
    try {
      //const task = await this.tasksRepository.findOneOrFail(id);
      return null;
    } catch (error) {
      // Handle the case where no task is found
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      // Rethrow other errors
      throw error;
    }
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskProto> {
    try {
      const result = await this.tasksRepository.create(createTaskDto);
      return await this.tasksRepository.save(result);
    } catch (error) {
      throw new Error('Could not save task');
    }
  }
  async updateTask(updateTaskDto: UpdateTaskDto) {
    try {
      return null;
    } catch (error) {
      throw new Error('Could not save task');
    }
  }
  async removeTask(findOneTaskDto: FindOneTaskDto): Promise<Task> {
    try {
      return null;
    } catch (error) {
      throw new Error('Could not save task');
    }
  }
  mapTaskEntityToTask(entity: Task): TaskProto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      dueDate: entity.dueDate,
      status: entity.status,
      createdAt: entity.createdAt,
    };
  }
}
