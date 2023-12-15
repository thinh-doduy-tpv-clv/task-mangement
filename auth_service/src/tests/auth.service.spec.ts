import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AuthValidator } from '../shared/services/auth-validator.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from '../shared/untils';
import { CryptoService } from '../shared/services/crypto.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import {
  IAuthReponse,
  IData,
  IError,
  IRegisterRequestDto,
} from '../shared/types/auth';
import { CryptoServiceMock } from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  //#region  Init Data
  // FinOneUser Data
  const user = {
    id: 2,
    username: 'nkmanh',
    email: 'Manh@gmail.com',
    password: '$2b$10$7pbMalkKZLcqUbP.HBTCrO6CSyMw41iDs/LtmhL7FRdoOAEX3GZw2',
    refreshToken: '',
    createdAt: null,
    link: '',
  };
  const findOneUserResponse: IAuthReponse = {
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
    error: { errorCode: 400, errorMsg: 'User not found.' },
    isError: true,
    data: null,
  };
  //Login Data

  //Register Data

  const sucessfulRegisterRequestDto: IRegisterRequestDto = {
    email: 'Manh@gmail.com',
    username: 'nkmanh',
    password: 'Manh@123',
  };
  const registerErrorResponse: IAuthReponse = {
    error: {
      errorCode: 400,
      errorMsg: '',
    },
    isError: true,
    data: null,
  };
  const successfullRegisterResponse: IAuthReponse = {
    error: null,
    data: {
      registerResponse: {
        username: 'nkmanh',
        email: 'Manh@gmail.com',
      },
      user: user,
    },
    isError: false,
  };
  //#endregion End Init Data

  //#region  Init Instance
  let authService: AuthService;
  let authValidator: AuthValidator;
  let jwtService: JwtService;
  let configService: ConfigService;
  const authResponse: AuthResponse = {
    generateAuthResponse: jest
      .fn()
      .mockImplementation((data: IData, error: IError, isError) => ({
        data,
        error,
        isError,
      })),
  };
  const authRepository = {
    findOne: jest.fn().mockResolvedValue(user),
    create: jest.fn().mockResolvedValue(user),
    save: jest.fn().mockResolvedValue(user),
  };
  //#endregion End Init Instance
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthValidator,
          useFactory: (authRepository: Repository<User>) => ({
            // Add other methods you want to mock
            authRepository, // Provide the mock repository to the AuthValidator instance
          }),
          useValue: {
            tryParseInt: jest.fn().mockImplementation((id) => {
              const result = parseInt(id, 10);
              if (!isNaN(result)) {
                return result;
              }
              return null;
            }),
            checkValidLogin: jest.fn(),
            checkValidRegister: jest.fn(),
            checkValidUserName: jest.fn(),
          },
        },
        JwtService,
        ConfigService,
        {
          provide: AuthResponse,
          useValue: authResponse,
        },
        { provide: CryptoService, useClass: CryptoServiceMock },
        {
          provide: getRepositoryToken(User),
          useValue: authRepository,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    authValidator = module.get<AuthValidator>(AuthValidator);
    //authRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  describe('Find-One-User Function', () => {
    it('should return a user object for a valid user Id', async () => {
      const id = '2';
      authRepository.findOne.mockResolvedValueOnce(user);
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(authRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
      console.log(result);

      expect(result).toEqual(findOneUserResponse);
    });
    it('should return an error response as "User not found" when userId is 0.', async () => {
      const id = '0';
      authRepository.findOne.mockResolvedValueOnce(null);
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(authRepository.findOne).toHaveBeenCalledWith({ where: { id: 0 } });
      expect(result).toEqual(findOneUserErrorResponse);
    });
    it('should return an error response as "User not found" when userId is null.', async () => {
      const id = null;
      authRepository.findOne.mockResolvedValueOnce(null);
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(result).toEqual(findOneUserErrorResponse);
    });
    it('should return an error response as "User not found" when userId is empty.', async () => {
      const id = '';
      authRepository.findOne.mockResolvedValueOnce(null);
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(result).toEqual(findOneUserErrorResponse);
    });
    it('should return an error response as "User not found" when userId is text.', async () => {
      const id = 'text21';
      authRepository.findOne.mockResolvedValueOnce(null);
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(result).toEqual(findOneUserErrorResponse);
    });
    it('should return error response if an exception occurs', async () => {
      const id = '25';
      authRepository.findOne.mockRejectedValueOnce(new Error('Database error'));
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(authRepository.findOne).toHaveBeenCalledWith({
        where: { id: 25 },
      });
      expect(result).toEqual(findOneUserErrorResponse);
    });
  });
  describe('Register Function', () => {
    it('Test Regiter', async () => {
      jest.spyOn(authValidator, 'checkValidRegister').mockResolvedValue({
        isError: true,
        errorCode: 400,
        errorMessage: 'Invalid email format. Please use a valid email address.',
      });
      const error: IError = {
        errorCode: 400,
        errorMsg: 'Invalid email format. Please use a valid email address.',
      };
      const result = await authService.register({
        password: 'Manh@123',
        username: 'nanhk',
        email: 'nkhwha',
      });
      console.log(result);
      expect(result).toEqual({ ...registerErrorResponse, error });
    });
    it('Test successfully Regiter', async () => {
      authRepository.findOne = jest.fn(() => user);
      jest.spyOn(authValidator, 'checkValidRegister').mockResolvedValue({
        isError: false,
        errorCode: 0,
        errorMessage: '',
      });
      const result = await authService.register(sucessfulRegisterRequestDto);
      console.log(result);
      //expect(result).toEqual(successfullRegisterResponse);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
