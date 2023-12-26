import { GraphQLError } from 'graphql';

export class CustomError extends GraphQLError {
  constructor(message: string, statusCode: number, errorCode: string) {
    super(message, {
      extensions: {
        originalError: {
          message,
          statusCode,
          errorCode,
        },
      },
    });
  }
}
