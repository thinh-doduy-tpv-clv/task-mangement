import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class GetTasksListDto {
  @Field(() => Int)
  @IsInt({ message: 'Value must be integer' })
  @IsNotEmpty({ message: 'userId must not empty' })
  userId: number;
}
