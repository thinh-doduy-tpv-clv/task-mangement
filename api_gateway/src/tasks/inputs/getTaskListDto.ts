import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString, Min } from 'class-validator';

@InputType()
export class GetTasksListDto {
  @Field(() => Int)
  @IsNumber()
  @Min(1, { message: 'userId must be greater than 0' })
  userId: number;
}
