import { Args, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { ITaskReponse } from 'src/types/task';
import { GetTasksListDto } from './inputs/getTaskListDto';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { GraphQLError } from 'graphql';
import { CustomArgs } from 'src/utils/args/custom-args.decorator';
import { validate } from 'class-validator';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  @Query(() => [TaskModel])
  async getTaskList(
    @Args('input') input: GetTasksListDto,
  ): Promise<TaskModel[]> {
    try {
      const errors = await validate(input);
      console.log('errors: ', errors);
      const rawTasks: ITaskReponse = await lastValueFrom(
        this.taskService.findAllTask({ userId: input.userId }),
      );
      const respTasks: TaskModel[] =
        rawTasks && rawTasks.data && rawTasks.data.length > 0
          ? rawTasks.data
          : [];
      return respTasks;
    } catch (err) {
      console.log('err: ', err);
    }
  }
}
