import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<import("rxjs").Observable<import("./types/task").Tasks>>;
}
