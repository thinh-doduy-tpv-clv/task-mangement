import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { AUTH_PACKAGE_NAME, IAuthReponse, IData } from '../tasks/types/auth';
import { CustomException } from '../tasks/utils/exceptions/customException';
import { IGetTaskUserDto, ITask, ITaskReponse } from '../tasks/types/task';
import { of } from 'rxjs';
import { RESPONSE_MESSAGES } from '../tasks/utils/constants/messages';

describe('Task Service', () => {
  //#region Init Data
  const user = {
    id: 2,
    username: 'nkmanh',
    email: 'Manh@gmail.com',
    password: '$2b$10$7pbMalkKZLcqUbP.HBTCrO6CSyMw41iDs/LtmhL7FRdoOAEX3GZw2',
    refreshToken: '',
    createdAt: null,
    link: '',
  };

  const findTasksSuccessResponse: ITask = {
    id: 1,
    title: 'Test1',
    description: 'Test D1',
    dueDate: new Date(),
    status: 'TODO',
    createdAt: new Date(),
    user: { ...user },
  };
  const findOneUserSuccessResponse: IAuthReponse = {
    error: null,
    isError: false,
    data: {
      user: {
        id: 2,
        username: 'nkmanh',
        email: 'Manh@gmail.com',
        password:
          '$2b$10$7pbMalkKZLcqUbP.HBTCrO6CSyMw41iDs/LtmhL7FRdoOAEX3GZw2',
        refreshToken: '',
        createdAt: null,
        link: '',
      },
    },
  };
  const findOneUserErrorResponse: IAuthReponse = {
    error: null,
    isError: false,
    data: null,
  };

  //Get Tasks Data
  const getTaskUserDto: IGetTaskUserDto = {
    userId: 1,
  };
  const getTaskSuccessResponse: ITaskReponse = {
    data: [findTasksSuccessResponse],
    error: null,
    message: RESPONSE_MESSAGES.GET_TASK_LIST_SUCCESS,
    isError: false,
  };
  //#endregion End Init Data

  let tasksService: TasksService;
  let tasksRepository = {
    create: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue(null),
    //findOneUser: jest.fn().mockResolvedValue(null),
  };
  // Mock implementation for lastValueFrom
  jest.mock('rxjs', () => ({
    lastValueFrom: jest.fn().mockImplementation((observable) => {
      return new Promise((resolve, reject) => {
        observable.subscribe({
          next: (value) => resolve(value),
          error: (error) => reject(error),
        });
      });
    }),
  }));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: tasksRepository,
        },
        {
          provide: AUTH_PACKAGE_NAME,
          useValue: {
            getService: jest.fn(() => ({
              findOneUser: jest.fn().mockReturnValue(of(null)),
            })),
          },
        },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get(getRepositoryToken(Task));
    tasksRepository.find = jest.fn(() => [findTasksSuccessResponse]);
    tasksService.onModuleInit();
  });
  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });
  describe('Get-Tasks Function', () => {
    it('should throw an exception when userId is not provided', async () => {
      await expect(tasksService.getTasks({} as any)).rejects.toThrow(
        CustomException,
      );
      await expect(tasksService.getTasks(undefined)).rejects.toThrow(
        CustomException,
      );
      await expect(tasksService.getTasks(null)).rejects.toThrow(
        CustomException,
      );
      await expect(
        tasksService.getTasks({ ...getTaskUserDto, userId: 0 }),
      ).rejects.toThrow(CustomException);
      expect(tasksRepository.find).not.toHaveBeenCalled();
    });
    it('should throw CustomException when user is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserErrorResponse));
      await expect(tasksService.getTasks(getTaskUserDto)).rejects.toThrow(
        CustomException,
      );
      expect(tasksRepository.find).not.toHaveBeenCalled();
    });

    it('should return tasks successfully', async () => {
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      const result = await tasksService.getTasks(getTaskUserDto);
      expect(tasksRepository.find).toHaveBeenCalled();
      expect(result).toEqual(getTaskSuccessResponse);
    });
  });
});
