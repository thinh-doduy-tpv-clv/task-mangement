import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks/tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { AUTH_PACKAGE_NAME, IAuthReponse, IData } from '../tasks/types/auth';
import { CustomException } from '../tasks/utils/exceptions/customException';
import {
  ICreateTaskDto,
  IFindOneTaskDto,
  IGetTaskUserDto,
  ITask,
  ITaskReponse,
  IUpdateTaskDto,
} from '../tasks/types/task';
import { of } from 'rxjs';
import { RESPONSE_MESSAGES } from '../tasks/utils/constants/messageStatus';
import { NotFoundException } from '@nestjs/common';

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

  //Create Task
  const createTaskDto: ICreateTaskDto = {
    title: 'Test Creat Task',
    description: 'Test Description ',
    dueDate: new Date(),
    status: 'ToDo',
    userId: 2,
  };

  //Update Task
  const updateTaskDto: IUpdateTaskDto = {
    id: 1,
    title: 'Test title',
    description: 'test description',
    dueDate: new Date(),
    status: 'TODO',
    userId: 1,
  };
  //Remove Task

  const findOneTaskDto: IFindOneTaskDto = {
    id: 1,
    userId: 1,
  };

  //#endregion End Init Data

  let tasksService: TasksService;
  let tasksRepository = {
    create: jest.fn().mockResolvedValue(null),
    find: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue(null),
    remove: jest.fn().mockResolvedValue(null),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(null),
    })),
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
    tasksRepository.create = jest.fn(() => findTasksSuccessResponse);
    tasksRepository.save = jest.fn(() => findTasksSuccessResponse);
    tasksRepository.remove = jest.fn(() => findTasksSuccessResponse);
    tasksRepository.createQueryBuilder().getOne = jest
      .fn()
      .mockResolvedValue(findTasksSuccessResponse);
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
  describe('GetTaskById Function', () => {
    it('should return task successfully', async () => {
      jest
        .spyOn(tasksRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => ({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockResolvedValueOnce(findTasksSuccessResponse),
        }));
      const result = await tasksService.getTaskById(1, 1);
      expect(result).toEqual({ ...getTaskSuccessResponse, message: '' });
    });
    it('should throw an error with message "Task with ID 2 not found', async () => {
      jest
        .spyOn(tasksRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => {
          throw { name: 'EntityNotFound' }; // Simulating EntityNotFound error
        });
      await expect(async () => {
        await tasksService.getTaskById(2, 2);
      }).rejects.toThrow(new NotFoundException('Task with ID 2 not found'));
    });
    it('should return error response if exeption occurs.', async () => {
      jest
        .spyOn(tasksRepository, 'createQueryBuilder')
        .mockImplementationOnce(() => {
          throw new Error('Database error'); // Simulating EntityNotFound error
        });
      await expect(async () => {
        await tasksService.getTaskById(3, 3);
      }).rejects.toThrow('Database error');
    });
  });
  describe('CreateTask Function', () => {
    it('should throw an exception when userId is not provided', async () => {
      await expect(tasksService.createTask({} as any)).rejects.toThrow(
        CustomException,
      );
      await expect(tasksService.createTask(undefined)).rejects.toThrow(
        CustomException,
      );
      await expect(tasksService.createTask(null)).rejects.toThrow(
        CustomException,
      );
    });
    it('should throw CustomException when user is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserErrorResponse));
      await expect(tasksService.createTask(createTaskDto)).rejects.toThrow(
        CustomException,
      );
      expect(tasksRepository.create).not.toHaveBeenCalled();
    });
    it('should throw CustomException when status is empty', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      await expect(
        tasksService.createTask({ ...createTaskDto, status: '' }),
      ).rejects.toThrow(CustomException);
      expect(tasksRepository.create).not.toHaveBeenCalled();
    });
    it('should throw CustomException when title is empty', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      await expect(
        tasksService.createTask({ ...createTaskDto, title: '' }),
      ).rejects.toThrow(CustomException);
      expect(tasksRepository.create).not.toHaveBeenCalled();
    });
    it('should create task successfully ', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...getTaskSuccessResponse, message: '' }),
        );
      const result = await tasksService.createTask(createTaskDto);
      expect(tasksRepository.create).toHaveBeenCalled();
      expect(tasksRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...getTaskSuccessResponse, message: '' });
    });
  });
  describe('UpdateTask Function', () => {
    it('should throw an exception when taskId is not provided', async () => {
      await expect(tasksService.updateTask({} as any)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
      await expect(tasksService.updateTask(undefined)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
      await expect(tasksService.updateTask(null)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
    });
    it('should throw an exception when userId is not provided', async () => {
      await expect(
        tasksService.updateTask({ ...updateTaskDto, userId: null }),
      ).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED),
      );
      await expect(
        tasksService.updateTask({ ...updateTaskDto, userId: undefined }),
      ).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED),
      );
    });
    it('should throw CustomException when task status is invalid', async () => {
      await expect(
        tasksService.updateTask({ ...updateTaskDto, status: 'INVALID_STATUS' }),
      ).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_STATUS_INVALID),
      );
    });
    it('should throw CustomException when user is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(null));
      await expect(tasksService.updateTask(updateTaskDto)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_NOT_EXISTED),
      );
    });
    it('should throw CustomException when task is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() => Promise.resolve(null));
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      await expect(tasksService.updateTask(updateTaskDto)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_NOT_FOUND),
      );
    });
    it('should update task successfully ', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...getTaskSuccessResponse, message: '' }),
        );
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...getTaskSuccessResponse, message: '' }),
        );
      const result = await tasksService.updateTask(updateTaskDto);
      expect(tasksRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ ...getTaskSuccessResponse, message: '' });
    });
  });
  describe('RemoveTask Function', () => {
    it('should throw an exception when taskId is not provided', async () => {
      await expect(tasksService.removeTaskById({} as any)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
      await expect(tasksService.updateTask(undefined)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
      await expect(tasksService.updateTask(null)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_ID_REQUIRED),
      );
    });
    it('should throw an exception when userId is not provided', async () => {
      await expect(
        tasksService.removeTaskById({ ...findOneTaskDto, userId: null }),
      ).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED),
      );
      await expect(
        tasksService.removeTaskById({ ...findOneTaskDto, userId: undefined }),
      ).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_ID_REQUIRED),
      );
    });
    it('should throw CustomException when user is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(null));
      await expect(tasksService.removeTaskById(findOneTaskDto)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.USER_NOT_EXISTED),
      );
    });
    it('should throw CustomException when task is not found', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));
      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() => Promise.resolve(null));
      await expect(tasksService.removeTaskById(findOneTaskDto)).rejects.toThrow(
        new CustomException(RESPONSE_MESSAGES.TASK_NOT_FOUND),
      );
    });
    it('should remove task successfully ', async () => {
      expect(tasksService._authService).toBeDefined();
      tasksService._authService.findOneUser = jest
        .fn()
        .mockReturnValue(of(findOneUserSuccessResponse));

      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementationOnce(() =>
          Promise.resolve({ ...getTaskSuccessResponse, message: '' }),
        );
      const result = await tasksService.removeTaskById(findOneTaskDto);
      expect(tasksRepository.remove).toHaveBeenCalled();
      expect(result).toEqual({ ...getTaskSuccessResponse, message: '' });
    });
  });
});
