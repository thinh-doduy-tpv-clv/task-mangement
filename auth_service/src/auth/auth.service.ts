import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  IAuthReponse,
  IData,
  IForgotPasswordRequestDto,
  ILoginRequestDto,
  IRegisterRequestDto,
  IResetPasswordRequestDto,
  IUser as UserProto,
} from '../shared/types/auth';
import { User } from './entities/user.entity';

import { AuthValidator } from '../shared/services/auth-validator.service';
import { CryptoService } from '../shared/services/crypto.service';
import { AuthResponse } from '../shared/untils';
import { AuthErrorResponseDto } from './dto/auth-error-response.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<UserProto>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly authValidator: AuthValidator,
    private readonly authResponse: AuthResponse,
    private readonly cryptoService: CryptoService,
  ) {}

  // async updateUser(updateUserDto: IUpdateUserDto): Promise<IAuthReponse> {
  //   //validate
  //   if (!updateUserDto)
  //     return this.authResponse.generateAuthResponse(
  //       null,
  //       { errorCode: 400, errorMsg: 'Update user failure.' },
  //       true,
  //     );
  //   const userId = this.authValidator.tryParseInt(updateUserDto.id);
  //   if (!userId)
  //     return this.authResponse.generateAuthResponse(
  //       null,
  //       { errorCode: 400, errorMsg: 'User not found.' },
  //       true,
  //     );
  //   try {
  //     const user = await this.authRepository.findOne({
  //       where: [
  //         { id: userId },
  //         { email: updateUserDto.email },
  //         { username: updateUserDto.username },
  //       ],
  //     });
  //     if (!user) {
  //       return this.authResponse.generateAuthResponse(
  //         null,
  //         { errorCode: 400, errorMsg: 'User not found.' },
  //         true,
  //       );
  //     }
  //     //todo
  //     //Hash Password
  //     //Update user information
  //   } catch (error) {}
  //   return null;
  // }
  async findOneUser(id: string): Promise<IAuthReponse> {
    const userId = this.authValidator.tryParseInt(id);
    if (userId === null)
      return this.authResponse.generateAuthResponse(
        null,
        { errorCode: 400, errorMsg: 'User not found.' },
        true,
      );
    try {
      const user = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return this.authResponse.generateAuthResponse(
          null,
          { errorCode: 400, errorMsg: 'User not found.' },
          true,
        );
      }
      return this.authResponse.generateAuthResponse({ user }, null, false);
    } catch (error) {
      return this.authResponse.generateAuthResponse(
        null,
        { errorCode: 400, errorMsg: 'User not found.' },
        true,
      );
    }
  }
  async register(
    registerRequestDto: IRegisterRequestDto,
  ): Promise<IAuthReponse> {
    try {
      const authErrorResponse = await this.authValidator.checkValidRegister(
        registerRequestDto,
      );
      if (authErrorResponse.isError) {
        return this.authResponse.generateAuthResponse(
          null,
          {
            errorCode: authErrorResponse.errorCode,
            errorMsg: authErrorResponse.errorMessage,
          },
          true,
        );
      }
      const hashPassword = await this.hashPassword(registerRequestDto.password);
      const result = this.authRepository.create({
        ...registerRequestDto,
        password: hashPassword,
      });
      await this.authRepository.save(result);
    } catch (error) {
      return this.authResponse.generateAuthResponse(
        null,
        {
          errorCode: 400,
          errorMsg: error.message,
        },
        true,
      );
    }
    const registeredUser = await this.authRepository.findOne({
      where: { username: registerRequestDto.username },
    });
    if (!registeredUser) {
      return this.authResponse.generateAuthResponse(
        null,
        {
          errorCode: 400,
          errorMsg: 'User not found.',
        },
        true,
      );
    }
    const registerResponse = {
      registerResponse: {
        username: registerRequestDto.username,
        email: registerRequestDto.email,
      },
      user: {
        id: registeredUser.id,
        createdAt: registeredUser.createdAt,
        email: registeredUser.email,
        password: registeredUser.password,
        refreshToken: registeredUser.refreshToken,
        username: registeredUser.username,
        link: '',
      },
    } as IData;
    return this.authResponse.generateAuthResponse(
      registerResponse,
      null,
      false,
    );
  }
  async login(loginRequestDto: ILoginRequestDto): Promise<IAuthReponse> {
    const errorResponse = new AuthErrorResponseDto();
    errorResponse.isError = false;
    errorResponse.errorCode = 400;
    errorResponse.errorMessage = 'Username or Password not corrrect.';
    //check null
    if (
      this.authValidator.isNullOrEmpty(loginRequestDto.username) ||
      this.authValidator.isNullOrEmpty(loginRequestDto.password)
    ) {
      return this.authResponse.generateAuthResponse(
        null,
        {
          errorCode: errorResponse.errorCode,
          errorMsg: errorResponse.errorMessage,
        },
        true,
      );
    }
    //check logic
    try {
      const user = await this.authRepository.findOne({
        where: { username: loginRequestDto.username },
      });
      if (!user) {
        return this.authResponse.generateAuthResponse(
          null,
          {
            errorCode: errorResponse.errorCode,
            errorMsg: errorResponse.errorMessage,
          },
          true,
        );
      }
      const checkPass = bcrypt.compareSync(
        loginRequestDto.password,
        user.password,
      );
      if (!checkPass) {
        return this.authResponse.generateAuthResponse(
          null,
          {
            errorCode: errorResponse.errorCode,
            errorMsg: errorResponse.errorMessage,
          },
          true,
        );
      }
      //Generate access_token and refresh_token
      const payload = { id: user.id, email: user.email };
      const token = await this.generateToken(payload);
      //Update refresh token into database
      await this.authRepository.update(
        {
          email: user.email,
        },
        { refreshToken: token.refreshToken },
      );
      const result: IData = {
        loginResponse: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          refreshToken: token?.refreshToken || '',
          accessToken: token?.accessToken || '',
          createdAt: user.createdAt,
          link: '',
        },
      };
      return this.authResponse.generateAuthResponse(result, null, false);
    } catch (error) {
      errorResponse.errorMessage = error.message;
      return this.authResponse.generateAuthResponse(
        null,
        {
          errorCode: errorResponse.errorCode,
          errorMsg: errorResponse.errorMessage,
        },
        true,
      );
    }
  }
  // async refreshToken(
  //   refreshTokenRequestDto: IRefreshTokenRequestDto,
  // ): Promise<IAuthReponse> {
  //   if (this.authValidator.isNullOrEmpty(refreshTokenRequestDto.refreshToken)) {
  //     return this.authResponse.generateAuthResponse(
  //       null,
  //       { errorCode: 400, errorMsg: 'Refresh token is not null' },
  //       true,
  //     );
  //   }
  //   try {
  //     const verify = await this.jwtService.verifyAsync(
  //       refreshTokenRequestDto.refreshToken,
  //       {
  //         secret: this.configService.get<string>('SECRET'),
  //       },
  //     );
  //     const checkExistToken = await this.authRepository.findOneBy({
  //       email: verify.email,
  //       refreshToken: refreshTokenRequestDto.refreshToken,
  //     });
  //     if (checkExistToken) {
  //       const token = await this.generateToken({
  //         id: verify.id,
  //         email: verify.email,
  //       });
  //       await this.authRepository.update(
  //         {
  //           email: verify.email,
  //         },
  //         { refreshToken: token.refreshToken },
  //       );
  //       return this.authResponse.generateAuthResponse(
  //         {
  //           loginResponse: {
  //             accessToken: token.accessToken,
  //             refreshToken: token.refreshToken,
  //           },
  //         },
  //         null,
  //         false,
  //       );
  //     } else {
  //       return this.authResponse.generateAuthResponse(
  //         null,
  //         { errorCode: 400, errorMsg: 'Refresh token is not valid' },
  //         true,
  //       );
  //     }
  //   } catch (error) {
  //     return this.authResponse.generateAuthResponse(
  //       null,
  //       { errorCode: 400, errorMsg: error },
  //       true,
  //     );
  //   }
  // }
  async forgotPassword(
    forgotPasswordRequestDto: IForgotPasswordRequestDto,
  ): Promise<IAuthReponse> {
    try {
      if (
        this.authValidator.isNullOrEmpty(forgotPasswordRequestDto.email) ||
        this.authValidator.isNullOrEmpty(forgotPasswordRequestDto.username)
      ) {
        return this.authResponse.generateAuthResponse(
          null,
          { errorCode: 400, errorMsg: 'Email or Username is not empty.' },
          true,
        );
      }
      //Check input in Db
      const user = await this.authRepository.findOneBy({
        email: forgotPasswordRequestDto.email,
        username: forgotPasswordRequestDto.username,
      });
      if (!user) {
        return this.authResponse.generateAuthResponse(
          null,
          { errorCode: 400, errorMsg: 'User not found.' },
          true,
        );
      }
      const encryptText = this.cryptoService.encrypt(user.username);
      return this.authResponse.generateAuthResponse(
        {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            password: '',
            refreshToken: '',
            accessToken: '',
            createdAt: null,
            link: encryptText,
          },
        },
        null,
        false,
      );
    } catch (error) {
      return this.authResponse.generateAuthResponse(
        null,
        { errorCode: 400, errorMsg: error.message },
        true,
      );
    }
  }
  async resetPassword(
    resetPasswordRequestDto: IResetPasswordRequestDto,
  ): Promise<IAuthReponse> {
    if (
      this.authValidator.isNullOrEmpty(resetPasswordRequestDto.encryptInput) ||
      this.authValidator.isNullOrEmpty(resetPasswordRequestDto.newPassword)
    ) {
      return this.authResponse.generateAuthResponse(
        null,
        { errorCode: 400, errorMsg: 'Input is not empty.' },
        true,
      );
    }
    try {
      const decryptText = this.cryptoService.decrypt(
        resetPasswordRequestDto.encryptInput,
      );
      //check in db
      const user = await this.authRepository.findOneBy({
        username: decryptText,
      });
      if (!user) {
        return this.authResponse.generateAuthResponse(
          null,
          { errorCode: 400, errorMsg: 'User not found.' },
          true,
        );
      }
      //check format of password
      const password = this.authValidator.checkValidPassword(
        resetPasswordRequestDto.newPassword,
      );
      //hash password
      if (password.isError) {
        return this.authResponse.generateAuthResponse(
          null,
          { errorCode: password.errorCode, errorMsg: password.errorMessage },
          true,
        );
      }
      const hashPassword = await this.hashPassword(
        resetPasswordRequestDto.newPassword,
      );
      await this.authRepository.update(
        {
          username: decryptText,
        },
        { password: hashPassword },
      );
      return this.authResponse.generateAuthResponse(
        {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            password: '',
            refreshToken: '',
            accessToken: '',
            createdAt: null,
            link: '',
          },
        },
        null,
        false,
      );
    } catch (error) {
      return this.authResponse.generateAuthResponse(
        null,
        { errorCode: 400, errorMsg: error.message },
        true,
      );
    }
  }
  async generateToken(payload: { id: number; email: string }) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('SECRET'),
        expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('SECRET'),
        expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
      });
      return { accessToken, refreshToken };
    } catch (error) {}
  }
  async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
