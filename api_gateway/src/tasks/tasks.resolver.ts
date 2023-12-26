import { UseFilters, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { ITaskReponse } from 'src/types/task';
import { ValidationExceptionFilter } from 'src/utils/exceptions/custom-filter.exception';
import { CreateTaskDto } from './inputs/createTaskDto';
import { GetTasksListDto } from './inputs/getTaskListDto';
import { RemoveTaskDto } from './inputs/removeTaskDto';
import { UpdateTaskDto } from './inputs/updateTaskDto';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { CustomError } from 'src/utils/exceptions/custom-exception.format';
import { HttpStatusCodes } from 'src/utils/constants/messages';
import { HttpStatusMessages } from 'src/utils/constants/errorCodes';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  /**
   * This function get all tasks based on given userId
   * @param input contains userId
   * @returns list of tasks of given userId
   */
  // @UseGuards(JwtAuthGuard)
  @Query(() => [TaskModel])
  async getTaskList(
    @Args('input')
    input: GetTasksListDto,
  ): Promise<TaskModel[]> {
    const taskResponse: ITaskReponse = await lastValueFrom(
      this.taskService.findAllTask({ userId: input.userId }),
    );

    if (taskResponse.isError) {
      throw new CustomError(
        taskResponse.error.errorMsg,
        taskResponse.error.errorCode,
        HttpStatusMessages[HttpStatusCodes.BAD_REQUEST],
      );
    }

    const respTasks: TaskModel[] =
      taskResponse && taskResponse.data && taskResponse.data.length > 0
        ? taskResponse.data
        : [];
    return respTasks;
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('input', new ValidationPipe({ transform: true, whitelist: true }))
    input: CreateTaskDto,
  ): Promise<TaskModel> {
    const taskResponse: ITaskReponse = await lastValueFrom(
      this.taskService.createTask({
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        status: input.status,
        userId: input.userId,
      }),
    );

    // Handle server errors
    if (taskResponse.isError) {
      throw new CustomError(
        taskResponse.error.errorMsg,
        taskResponse.error.errorCode,
        HttpStatusMessages[HttpStatusCodes.BAD_REQUEST],
      );
    }
    const newTask: TaskModel =
      taskResponse && taskResponse.data
        ? Object.assign({} as TaskModel, taskResponse.data[0])
        : new TaskModel();
    return newTask;
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
