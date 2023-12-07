import { Observable } from "rxjs";
export declare const protobufPackage = "task";
export interface UpdateTaskDto {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}
export interface FindOneTaskDto {
    id: string;
}
export interface Empty {
}
export interface Tasks {
    tasks: Task[];
}
export interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: string;
    status: string;
}
export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: Date | undefined;
}
export declare const TASK_PACKAGE_NAME = "task";
export interface TasksServiceClient {
    createTask(request: CreateTaskDto): Observable<Task>;
    findAllTask(request: Empty): Observable<Tasks>;
    findOneTask(request: FindOneTaskDto): Observable<Task>;
    updateTask(request: UpdateTaskDto): Observable<Task>;
    removeTask(request: FindOneTaskDto): Observable<Task>;
}
export interface TasksServiceController {
    createTask(request: CreateTaskDto): Promise<Task> | Observable<Task> | Task;
    findAllTask(request: Empty): Promise<Tasks> | Observable<Tasks> | Tasks;
    findOneTask(request: FindOneTaskDto): Promise<Task> | Observable<Task> | Task;
    updateTask(request: UpdateTaskDto): Promise<Task> | Observable<Task> | Task;
    removeTask(request: FindOneTaskDto): Promise<Task> | Observable<Task> | Task;
}
export declare function TasksServiceControllerMethods(): (constructor: Function) => void;
export declare const TASKS_SERVICE_NAME = "TasksService";
