import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ITaskReponse } from 'src/types/task';
import { TASK_STATUS } from 'src/utils/constants';
import { JwtAuthGuard } from '../auth/utils/jwt.guard';
import { GetTasksListDto } from './inputs/getTaskListDto';
import { TasksModule } from './tasks.module';
import { TaskResolver as TasksResolver } from './tasks.resolver';
import { TasksService } from './tasks.service';

jest.mock('../auth/utils/jwt.guard');
jest.mock('./tasks.service');

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksResolver, TasksService, JwtAuthGuard],
      imports: [TasksModule],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTaskList', () => {
    it('should return an array of tasks', async () => {
      const expectedMockResult: ITaskReponse = {
        data: [
          {
            id: 1,
            title: 'Test Task',
            description: 'Test Description',
            dueDate: new Date(),
            status: TASK_STATUS.TODO,
            createdAt: new Date(),
            user: {
              id: 1,
              createdAt: new Date(),
              email: '',
              password: '',
              refreshToken: '',
              username: '',
            },
          },
        ],
        error: { errorCode: 0, errorMsg: '' },
        isError: false,
        message: 'Success',
      };
      const dto: GetTasksListDto = { userId: 1 };

      jest
        .spyOn(service, 'findAllTask')
        .mockReturnValue(of(expectedMockResult));

      const actualTaskList = await resolver.getTaskList(dto);
      expect(actualTaskList).toBe(expectedMockResult.data);
    });
  });
});
