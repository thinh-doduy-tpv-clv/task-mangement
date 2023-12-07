import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
export declare class TasksService implements OnModuleInit {
    private client;
    private tasksService;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    findAllTask(): import("rxjs").Observable<import("./types/task").Tasks>;
}
