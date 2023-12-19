import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TASK_STATUS } from 'src/utils/constants';

@InputType()
export class UpdateTaskDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Title must be provided' })
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  dueDate: Date;

  @Field(() => String, { defaultValue: 'TODO' })
  @IsEnum(TASK_STATUS, { message: 'Unavailable status' })
  @IsString()
  status: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'user ID is required' })
  userId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'task ID is required' })
  taskId: number;
}
