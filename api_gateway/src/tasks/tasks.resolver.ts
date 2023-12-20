import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/utils/jwt.guard';
import { ITaskReponse } from 'src/types/task';
import { CreateTaskDto } from './inputs/createTaskDto';
import { GetTasksListDto } from './inputs/getTaskListDto';
import { UpdateTaskDto } from './inputs/updateTaskDto';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { validate } from 'class-validator';
import { RemoveTaskDto } from './inputs/removeTaskDto';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  /**
   * This function get all tasks based on given userId
   * @param input contains userId
   * @returns list of tasks of given userId
   */
  @UseGuards(JwtAuthGuard)
  @Query(() => [TaskModel])
  async getTaskList(
    @Args('input', new ValidationPipe({ transform: true, whitelist: true }))
    input: GetTasksListDto,
  ): Promise<TaskModel[]> {
    const errors = validate(input);
    if ((await errors).length > 0) {
      console.log('error: ', errors);
      throw new BadRequestException(errors[0].message);
    }
    const rawTasks: ITaskReponse = await lastValueFrom(
      this.taskService.findAllTask({ userId: input.userId }),
    );

    const respTasks: TaskModel[] =
      rawTasks && rawTasks.data && rawTasks.data.length > 0
        ? rawTasks.data
        : [];
    return respTasks;
  }

  @Mutation(() => TaskModel)
  async createTask(@Args('input') input: CreateTaskDto): Promise<TaskModel> {
    const newTask: ITaskReponse = await lastValueFrom(
      this.taskService.createTask({
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        status: input.status,
        userId: input.userId,
      }),
    );
    const taskResponse: TaskModel =
      newTask && newTask.data
        ? Object.assign({} as TaskModel, newTask.data[0])
        : new TaskModel();
    return taskResponse;
  }

  @Mutation(() => TaskModel)
  async updateTask(@Args('input') input: UpdateTaskDto): Promise<TaskModel> {
    const updateData: ITaskReponse = await lastValueFrom(
      this.taskService.updateTask({
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        status: input.status,
        userId: input.userId,
        id: input.taskId,
      }),
    );
    const taskResponse: TaskModel =
      updateData && updateData.data
        ? Object.assign({} as TaskModel, updateData.data[0])
        : new TaskModel();
    return taskResponse;
  }

  @Mutation(() => TaskModel)
  async removeTask(@Args('input') input: RemoveTaskDto): Promise<TaskModel> {
    const removedTask: ITaskReponse = await lastValueFrom(
      this.taskService.removeTask({
        userId: input.userId,
        id: input.id,
      }),
    );
    const taskResponse: TaskModel =
      removedTask && removedTask.data
        ? Object.assign({} as TaskModel, removedTask.data[0])
        : new TaskModel();
    return taskResponse;
  }
}
