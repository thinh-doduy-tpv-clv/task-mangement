import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

@InputType()
export class GetTasksListDto {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
