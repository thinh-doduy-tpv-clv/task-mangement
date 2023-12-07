import { Controller } from '@nestjs/common';
import {
  CreateTaskDto,
  Empty,
  FindOneTaskDto,
  TasksServiceController,
  TasksServiceControllerMethods,
  UpdateTaskDto,
} from './types/task';
import { TasksService } from './tasks.service';

@Controller('tasks')
@TasksServiceControllerMethods()
export class TasksController implements TasksServiceController {
  constructor(private readonly tasksService: TasksService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
  async findAllTask() {
    return this.tasksService.getTasks();
  }
  async findOneTask(request: FindOneTaskDto) {
    return null;
  }
  async updateTask(request: UpdateTaskDto) {
    return null;
  }
  async removeTask(request: FindOneTaskDto) {
    return null;
  }
}
