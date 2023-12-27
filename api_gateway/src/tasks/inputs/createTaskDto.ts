import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
} from 'class-validator';
import { TASK_STATUS } from 'src/utils/constants';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  // @Max(10, { message: 'title must be less than 10 characters' })
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  dueDate: Date;

  @Field(() => String, { defaultValue: 'TODO' })
  // @IsEnum(TASK_STATUS, { message: 'Unavailable status' })
  // @IsIn(['TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVED'])
  @IsString()
  status: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'user ID is required' })
  userId: number;
}
