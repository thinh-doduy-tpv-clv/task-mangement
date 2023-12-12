import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthErrorResponseDto } from '../../auth/dto/auth-error-response.dto';

import {
  IAuthReponse,
  ILoginRequestDto,
  IRegisterRequestDto,
} from '../types/auth';

@Injectable()
export class AuthValidator {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
  ) {}

  checkValidLogin(loginRequestDto: ILoginRequestDto): AuthErrorResponseDto {
    return null;
  }
  async checkValidRegister(
    registerRequestDto: IRegisterRequestDto,
  ): Promise<AuthErrorResponseDto> {
    const username = await this.checkValidUserName(registerRequestDto.username);
    if (username.isError) return username;
    const password = this.checkValidPassword(registerRequestDto.password);
    if (password.isError) return password;
    const email = await this.checkValidEmail(registerRequestDto.email);
    if (email.isError) return email;
    return { isError: false, errorCode: 0, errorMessage: '' };
  }
  //Validate userName
  async checkValidUserName(username: string): Promise<AuthErrorResponseDto> {
    const ErrorResponse = new AuthErrorResponseDto();
    ErrorResponse.errorCode = 400;
    ErrorResponse.isError = false;
    //Null
    if (this.isNullOrEmpty(username)) {
      ErrorResponse.errorMessage = 'Username cannot be empty.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    //length
    if (!this.isValidLengthOfUserName(username, 3, 22)) {
      ErrorResponse.errorMessage =
        'Username must be between 3 and 22 characters.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    //character
    if (!this.validateCharacterSet(username)) {
      ErrorResponse.errorMessage =
        'Username can only contain letters, numbers, underscores, or hyphens.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    // no space
    if (!this.hasNoSpaces(username)) {
      ErrorResponse.errorMessage = 'Username cannot contain spaces.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    // startwith letter
    if (!this.hasNoSpaces(username)) {
      ErrorResponse.errorMessage = 'Username must start with a letter.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    //No Special Characters:
    if (!this.hasNoSpecialCharacters(username)) {
      ErrorResponse.errorMessage =
        'Username cannot contain special characters.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    //Uniquenes
    if (!(await this.isUniqueUserName(username))) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Username already exists.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    ErrorResponse.errorCode = 0;
    return ErrorResponse;
  }
  // Validate Password
  checkValidPassword(password: string): AuthErrorResponseDto {
    const ErrorResponse = new AuthErrorResponseDto();
    ErrorResponse.isError = false;

    if (this.isNullOrEmpty(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Password cannot be empty.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.isValidLengthOfPassword(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Password must length > 8.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.hasLowerCaseLetter(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage =
        'Password must contain at least one lowercase letter.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.hasUpperCaseLetter(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage =
        'Password must contain at least one uppercase letter.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.hasNumber(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Password must contain at least one number.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.hasSpecialSymbol(password)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage =
        'Password must contain at least one special symbol.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    ErrorResponse.errorCode = 0;
    return ErrorResponse;
  }
  // Validate Email
  async checkValidEmail(email: string): Promise<AuthErrorResponseDto> {
    const ErrorResponse = new AuthErrorResponseDto();
    ErrorResponse.isError = false;
    if (this.isNullOrEmpty(email)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Email cannot be empty.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!this.isValidEmail(email)) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage =
        'Invalid email format. Please use a valid email address.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    if (!(await this.isUniqueEmail(email))) {
      ErrorResponse.errorCode = 400;
      ErrorResponse.errorMessage = 'Email already exists.';
      ErrorResponse.isError = true;
      return ErrorResponse;
    }
    return ErrorResponse;
  }

  //#region  Validate Email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  //#endregion End Validate Email

  //#region  Validate UserName

  isNullOrEmpty(input: string | null | undefined): boolean {
    // Check if the username is null, empty, or undefined
    return input === null || input === undefined || input.trim() === '';
  }
  isValidLengthOfUserName(
    input: string,
    minLength: number,
    maxLengh: number,
  ): boolean {
    if (input.length < minLength || input.length > maxLengh) {
      return false;
    }
    return true;
  }
  validateCharacterSet(input: string): boolean {
    // Define a regular expression for allowed characters (letters, numbers, underscores, hyphens)
    const allowedCharacterSetRegex = /^[a-zA-Z0-9_-]+$/;
    // Check if the input string matches the allowed character set
    return allowedCharacterSetRegex.test(input);
  }
  hasNoSpaces(input: string): boolean {
    // Define a regular expression to check for spaces
    const spaceRegex = /\s/;
    // Check if the username contains spaces
    return !spaceRegex.test(input);
  }
  startsWithLetter(input: string): boolean {
    // Define a regular expression to check if the username starts with a letter
    const letterRegex = /^[a-zA-Z]/;

    // Check if the username starts with a letter
    return letterRegex.test(input);
  }
  hasNoSpecialCharacters(input: string): boolean {
    // Define a regular expression to check for the absence of special characters
    const allowedCharactersRegex = /^[a-zA-Z0-9_\-]+$/;

    // Check if the username contains only allowed characters
    return allowedCharactersRegex.test(input);
  }
  hasNoConsecutiveSpecialCharacters(input: string): boolean {
    // Define a regular expression to check for consecutive special characters
    const consecutiveSpecialCharactersRegex = /[_\-]{2,}/;

    // Check if the username contains consecutive special characters
    return !consecutiveSpecialCharactersRegex.test(input);
  }
  async isUniqueUserName(input: string): Promise<boolean> {
    const existingUser = await this.authRepository.findOne({
      where: { username: input },
    });
    if (existingUser) {
      return false;
    }
    return true;
  }

  //#endregion End Validate UserName

  //#region  Validate Password
  async isUniqueEmail(email: string): Promise<boolean> {
    const existingEmail = await this.authRepository.findOne({
      where: { email: email },
    });
    if (existingEmail) {
      return false;
    }
    return true;
  }
  hasLowerCaseLetter(password: string): boolean {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(password);
  }
  hasUpperCaseLetter(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(password);
  }
  hasNumber(password: string): boolean {
    return /\d/.test(password);
  }
  hasSpecialSymbol(password: string): boolean {
    const specialSymbols = /[!@#$%^&*(),.?":{}|<>]/; // You can expand this list as needed
    return specialSymbols.test(password);
  }
  isValidLengthOfPassword(password: string) {
    if (!password || password.length < 8) {
      return false;
    }
    return true;
  }
  //#endregion End Validate Password

  tryParseInt(value: string): number | null {
    const result = parseInt(value, 10);
    // Check if the result of parsing is a valid number
    if (!isNaN(result)) {
      return result;
    }
    return null;
  }
}
