import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  dueDate: Date;

  @Field(() => String, { defaultValue: 'TODO' })
  status: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
