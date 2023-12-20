import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RemoveTaskDto {
  @Field(() => Int)
  @IsNotEmpty({ message: 'user ID is required' })
  userId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'task ID is required' })
  id: number;
}
