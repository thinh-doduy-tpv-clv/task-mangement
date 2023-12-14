import { Args, Query, Resolver } from '@nestjs/graphql';
import { validate } from 'class-validator';
import { GraphQLError } from 'graphql';
import { lastValueFrom } from 'rxjs';
import { ITaskReponse } from 'src/types/task';
import { GetTasksListDto } from './inputs/getTaskListDto';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  @Query(() => [TaskModel])
  async getTaskList(
    @Args('input') input: GetTasksListDto,
  ): Promise<TaskModel[]> {
    const rawTasks: ITaskReponse = await lastValueFrom(
      this.taskService.findAllTask({ userId: input.userId }),
    );
    const respTasks: TaskModel[] =
      rawTasks && rawTasks.data && rawTasks.data.length > 0
        ? rawTasks.data
        : [];
    return respTasks;
  }
}
