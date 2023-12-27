import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = exception.getResponse();
    const status = exception.getStatus();
    if (status === 400) {
      const exceptionResponse = exception.getResponse();
      const isValidationError = Array.isArray(exceptionResponse['message']);

      if (isValidationError) {
        throw new GraphQLError(`${exceptionResponse['message']}`, {
          extensions: {
            originalError: {
              message: exceptionResponse['message'],
              statusCode: status,
              errorCode: exceptionResponse['error'],
            },
          },
        });
      }
    }
  }
}

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const error = new GraphQLError('Unauthorized');
    throw error;
  }
}
