import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetTasksListDto {
  @Field(() => Int)
  userId: number;
}
