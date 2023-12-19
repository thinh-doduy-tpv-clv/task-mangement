import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString, Min } from 'class-validator';

@InputType()
export class GetTasksListDto {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty({ message: 'userId is required' })
  @Min(1, { message: 'userId should be positive number' })
  userId: number;
}
