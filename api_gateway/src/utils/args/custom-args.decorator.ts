import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

export const CustomArgs = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();

    // Access the input correctly
    const input = args.input;
    if (!input) {
      throw new GraphQLError('Input is required');
    }

    return args.input;
  },
);
