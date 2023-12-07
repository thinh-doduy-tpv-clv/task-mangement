import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  FindOneUserDto,
  Users as UsersProto,
  User as UserProto,
} from './types/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly tasksRepository: Repository<UserProto>,
  ) {}

  async getTasks(): Promise<UsersProto> {
    try {
      const result = await this.tasksRepository.find();
      return { users: result };
    } catch (error) {
      throw new Error('Could not fetch all users');
    }
  }
}
