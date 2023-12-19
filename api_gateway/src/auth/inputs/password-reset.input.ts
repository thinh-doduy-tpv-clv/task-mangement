import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RequestResetPasswordInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@InputType()
export class NewResetPasswordInput {
  @Field()
  @IsNotEmpty()
  encodedUsername: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
