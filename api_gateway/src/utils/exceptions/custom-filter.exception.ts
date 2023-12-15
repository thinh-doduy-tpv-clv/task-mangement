import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    // Extract validation errors from the exception
    const validationErrors = exception.getResponse()['message'];
    console.log('valid: ', validationErrors);

    // Create a custom GraphQL error with the validation messages
    const gqlError = new GraphQLError(validationErrors);

    // Send the custom GraphQL error to the client
    throw gqlError;
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
