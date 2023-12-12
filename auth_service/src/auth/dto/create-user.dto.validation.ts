import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDtoValidation {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
