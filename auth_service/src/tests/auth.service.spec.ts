import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AuthValidator } from '../shared/services/auth-validator.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from '../shared/untils';
import { CryptoService } from '../shared/services/crypto.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  IAuthReponse,
  IData,
  IError,
  IForgotPasswordRequestDto,
  ILoginRequestDto,
  ILoginResponseDto,
  IRegisterRequestDto,
  IResetPasswordRequestDto,
} from '../shared/types/auth';
import { CryptoServiceMock } from './mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthErrorResponseDto } from '../auth/dto/auth-error-response.dto';

describe('AuthService', () => {
  //#region  Init Data
  const access_token = '123456789';
  const refresh_token = '12345678910';
  const generateTokenReponse = {
    accessToken: access_token,
    refreshToken: refresh_token,
  };
  const authErrorResponseDto: AuthErrorResponseDto = {
    isError: false,
    errorCode: null,
    errorMessage: '',
  };
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
  const sucessfulLoginRequestDto: ILoginRequestDto = {
    username: 'nkmanh',
    password: 'Manh@123',
  };
  const successfulLoginResponse: IAuthReponse = {
    error: null,
    isError: false,
    data: {
      loginResponse: {
        accessToken: access_token,
        refreshToken: refresh_token,
      },
      user: {
        ...user,
        refreshToken: refresh_token,
        accessToken: access_token,
      },
    },
  };
  const errorLoginResponse: IAuthReponse = {
    error: {
      errorCode: 400,
      errorMsg: 'Username or Password not corrrect.',
    },
    isError: true,
    data: null,
  };
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
  const successfulRegisterResponse: IAuthReponse = {
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
  //Forgot Password
  const forgotPasswordSuccessRequestDto: IForgotPasswordRequestDto = {
    email: 'Manh@gmail.com',
    username: 'nkmanh',
  };
  const forgotPasswordErrorResponse: IAuthReponse = {
    error: {
      errorCode: 400,
      errorMsg: '',
    },
    isError: true,
    data: null,
  };
  const forgotPasswordSuccessResponse: IAuthReponse = {
    error: null,
    data: {
      user: { ...user, link: 'testlink', password: '', accessToken: '' },
    },
    isError: false,
  };
  const resetPasswordSuccessRequestDto: IResetPasswordRequestDto = {
    encryptInput: '123456789',
    newPassword: 'Manh@321',
  };
  const resetPasswordErrorResponse: IAuthReponse = {
    error: {
      errorCode: 400,
      errorMsg: '',
    },
    isError: true,
    data: null,
  };
  const resetPasswordSuccessResponse: IAuthReponse = {
    error: null,
    data: {
      user: { ...user, link: '', password: '', accessToken: '' },
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
  let authRepository = {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
    findOneBy: jest.fn().mockResolvedValue(null),
  };

  let cryptoService = {
    encrypt: jest.fn().mockResolvedValue('123456'),
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
            isNullOrEmpty: jest.fn(),
            checkValidLogin: jest.fn(),
            checkValidRegister: jest.fn().mockResolvedValue({
              isError: false,
              errorCode: 0,
              errorMessage: '',
            }),
            checkValidUserName: jest.fn(),
            checkValidPassword: jest
              .fn()
              .mockImplementation(() => authErrorResponseDto),
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
    authService.generateToken = jest
      .fn()
      .mockImplementation(() => Promise.resolve(generateTokenReponse));
    authValidator = module.get<AuthValidator>(AuthValidator);
    authRepository = module.get(getRepositoryToken(User));
    authRepository.findOne = jest.fn(() => user);
    authRepository.save = jest.fn(() => user);
    authRepository.create = jest.fn(() => user);
    authRepository.update = jest.fn();
    authRepository.findOneBy = jest.fn(() => user);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    const cryptoService = module.get<CryptoServiceMock>(CryptoService);
    cryptoService.encrypt = jest.fn(() => 'testlink');
    jest
      .spyOn(bcrypt, 'compareSync')
      .mockImplementation((password, hashedPassword) => {
        return true;
      });
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
    it('should return error response if an exception occurs. ', async () => {
      const id = '25';
      jest.spyOn(authRepository, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
      const result = await authService.findOneUser(id);
      expect(authValidator.tryParseInt).toHaveBeenCalledWith(id);
      expect(authRepository.findOne).toHaveBeenCalledWith({
        where: { id: 25 },
      });
      expect(result).toEqual(findOneUserErrorResponse);
    });
  });
  describe('Register Function', () => {
    it('should return successfully object when input valid user. ', async () => {
      authRepository.findOne.mockResolvedValueOnce(user);
      jest.spyOn(authValidator, 'checkValidRegister').mockResolvedValue({
        isError: false,
        errorCode: 0,
        errorMessage: '',
      });
      const result = await authService.register(sucessfulRegisterRequestDto);
      expect(result).toEqual(successfulRegisterResponse);
    });
    it('should return error response as "Invalid email format. Please use a valid email address." when invalid email format.', async () => {
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
      expect(result).toEqual({ ...registerErrorResponse, error });
    });
    it('should return error response as "User not found. ', async () => {
      authRepository.findOne.mockResolvedValueOnce(null);
      const error: IError = {
        errorCode: 400,
        errorMsg: 'User not found.',
      };
      const result = await authService.register({
        password: 'Manh@123',
        username: 'nanhk',
        email: 'Manh@gmail.com',
      });
      expect(result).toEqual({ ...registerErrorResponse, error });
    });
    it('should return error response if exeption occurs.', async () => {
      const exceptionMsg = 'Database error';
      const error: IError = {
        errorCode: 400,
        errorMsg: exceptionMsg,
      };
      jest.spyOn(authRepository, 'save').mockImplementationOnce(() => {
        throw new Error(exceptionMsg);
      });
      const result = await authService.register({
        password: 'Manh@123',
        username: 'nanhk',
        email: 'Manh152@gmail.com',
      });
      expect(result).toEqual({ ...registerErrorResponse, error });
    });
  });
  describe('Login Function', () => {
    it('should login successfully.', async () => {
      const result = await authService.login(sucessfulLoginRequestDto);
      expect(result).toEqual(successfulLoginResponse);
    });
    it('should return error response when username is empty.', async () => {
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.login({
        ...sucessfulLoginRequestDto,
        username: '',
      });
      expect(result).toEqual(errorLoginResponse);
    });
    it('should return error response when password is empty.', async () => {
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.login({
        ...sucessfulLoginRequestDto,
        password: '',
      });
      expect(result).toEqual(errorLoginResponse);
    });
    it('should return error response when user is not exist in database.', async () => {
      jest.spyOn(authRepository, 'findOne').mockImplementationOnce(() => null);
      const result = await authService.login({
        ...sucessfulLoginRequestDto,
        username: 'isNotExist',
      });
      expect(result).toEqual(errorLoginResponse);
    });
    it('should return error response when password is not correct in database.', async () => {
      jest
        .spyOn(bcrypt, 'compareSync')
        .mockImplementationOnce((password, hashedPassword) => {
          return false;
        });
      const result = await authService.login({
        ...sucessfulLoginRequestDto,
        password: 'notExist',
      });
      expect(result).toEqual(errorLoginResponse);
    });

    it('should return error response if exeption occurs.', async () => {
      const exceptionMsg = 'Database error';
      const error: IError = {
        errorCode: 400,
        errorMsg: exceptionMsg,
      };
      jest.spyOn(authRepository, 'update').mockImplementationOnce(() => {
        throw new Error(exceptionMsg);
      });
      const result = await authService.login({
        ...sucessfulLoginRequestDto,
        password: 'notExist',
      });
      expect(result).toEqual({ ...errorLoginResponse, error });
    });
  });
  describe('Forgot-Password Function', () => {
    it('should forgot password successfully', async () => {
      const result = await authService.forgotPassword(
        forgotPasswordSuccessRequestDto,
      );
      expect(result).toEqual(forgotPasswordSuccessResponse);
    });
    it('should return error response when email is empty.', async () => {
      const error: IError = {
        errorCode: 400,
        errorMsg: 'Email or Username is not empty.',
      };
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.forgotPassword({
        ...forgotPasswordSuccessRequestDto,
        email: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return error response when username is empty.', async () => {
      const error: IError = {
        errorCode: 400,
        errorMsg: 'Email or Username is not empty.',
      };
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.forgotPassword({
        ...forgotPasswordSuccessRequestDto,
        username: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });

    it('should return error response if exeption occurs.', async () => {
      const exceptionMsg = 'Database error';
      const error: IError = {
        errorCode: 400,
        errorMsg: exceptionMsg,
      };
      jest.spyOn(authRepository, 'findOneBy').mockImplementationOnce(() => {
        throw new Error(exceptionMsg);
      });
      const result = await authService.forgotPassword({
        ...forgotPasswordSuccessRequestDto,
        username: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return an error response as "User not found" when user is not exist in database.', async () => {
      const exceptionMsg = 'User not found.';
      const error: IError = {
        errorCode: 400,
        errorMsg: exceptionMsg,
      };
      jest.spyOn(authRepository, 'findOneBy').mockImplementationOnce(null);

      const result = await authService.forgotPassword({
        ...forgotPasswordSuccessRequestDto,
        username: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
  });
  describe('Reset-Password Fucntion', () => {
    it('should reset password successfully ', async () => {
      const result = await authService.resetPassword(
        resetPasswordSuccessRequestDto,
      );
      expect(result).toEqual(resetPasswordSuccessResponse);
    });
    it('should return error response when newPassword is empty.', async () => {
      const error: IError = {
        errorCode: 400,
        errorMsg: 'Input is not empty.',
      };
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.resetPassword({
        ...resetPasswordSuccessRequestDto,
        newPassword: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return error response when encryptInput is empty.', async () => {
      const error: IError = {
        errorCode: 400,
        errorMsg: 'Input is not empty.',
      };
      jest
        .spyOn(authValidator, 'isNullOrEmpty')
        .mockImplementationOnce(() => true);
      const result = await authService.resetPassword({
        ...resetPasswordSuccessRequestDto,
        encryptInput: '',
      });
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return error response if exeption occurs.', async () => {
      const exceptionMsg = 'Database error';
      const error: IError = {
        errorCode: 400,
        errorMsg: exceptionMsg,
      };
      jest.spyOn(authRepository, 'findOneBy').mockImplementationOnce(() => {
        throw new Error(exceptionMsg);
      });
      const result = await authService.resetPassword(
        resetPasswordSuccessRequestDto,
      );
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return an error response as "User not found" when user is not exist in database.', async () => {
      const errorMsg = 'User not found.';
      const error: IError = {
        errorCode: 400,
        errorMsg: errorMsg,
      };
      jest.spyOn(authRepository, 'findOneBy').mockImplementationOnce(null);
      const result = await authService.resetPassword(
        resetPasswordSuccessRequestDto,
      );
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
    it('should return an error response as "User not found" when newPassword is invalid format', async () => {
      const errorMsg = 'Password cannot be empty.';
      const authError = {
        isError: true,
        errorCode: 400,
        errorMessage: 'Password cannot be empty.',
      };
      const error: IError = {
        errorCode: authError.errorCode,
        errorMsg: authError.errorMessage,
      };
      jest
        .spyOn(authValidator, 'checkValidPassword')
        .mockImplementationOnce(() => authError);
      const result = await authService.resetPassword(
        resetPasswordSuccessRequestDto,
      );
      expect(result).toEqual({ ...forgotPasswordErrorResponse, error });
    });
  });
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });
});
