import { Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { Tasks } from 'src/types/task';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  @Query(() => [TaskModel])
  async getTaskList(
    @Args('input') input: GetTasksListDto,
  ): Promise<TaskModel[]> {
    try {
      const rawTasks: ITaskReponse = await lastValueFrom(
        this.taskService.findAllTask({ userId: input.userId }),
      );
      const respTasks: TaskModel[] =
        rawTasks && rawTasks.data && rawTasks.data.length > 0
          ? rawTasks.data
          : [];
      return respTasks;
    } catch (error) {
      return [];
    }
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
