import { Repository } from 'typeorm';
import { Users as UsersProto, User as UserProto } from './types/auth';
export declare class AuthService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<UserProto>);
    getTasks(): Promise<UsersProto>;
}
