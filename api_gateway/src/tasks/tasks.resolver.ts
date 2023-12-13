import { Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { Tasks } from 'src/types/task';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  @Query(() => [TaskModel])
  async getTaskList(): Promise<TaskModel[]> {
    try {
      const rawTasks: Tasks = await lastValueFrom(
        this.taskService.findAllTask(),
      );
      const respTasks: TaskModel[] =
        rawTasks && rawTasks.tasks && rawTasks.tasks.length > 0
          ? rawTasks.tasks
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
