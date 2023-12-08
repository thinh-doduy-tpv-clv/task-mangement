import { Query, Resolver } from '@nestjs/graphql';
import { TaskModel } from './models/tasks.model';
import { TasksService } from './tasks.service';
import { Tasks } from './types/task';
import { lastValueFrom } from 'rxjs';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private taskService: TasksService) {}

  @Query(() => [TaskModel])
  async getTaskList(): Promise<TaskModel[]> {
    const rawTasks: Tasks = await lastValueFrom(this.taskService.findAllTask());
    const respTasks: TaskModel[] =
      rawTasks && rawTasks.tasks && rawTasks.tasks.length > 0
        ? rawTasks.tasks
        : [];
    return respTasks;
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
