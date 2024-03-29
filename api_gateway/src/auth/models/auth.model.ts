import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field(() => Int)
  id?: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => String)
  link: string;
}
