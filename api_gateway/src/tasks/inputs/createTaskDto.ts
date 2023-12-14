import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TASK_STATUS } from 'src/utils/constants';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
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
}
