import { Injectable } from '@nestjs/common';
import { IAuthReponse, IData, IError } from '../types/auth';

@Injectable()
export class AuthResponse {
  generateAuthResponse(
    data: IData | undefined,
    error: IError | undefined,
    isError: boolean,
  ): IAuthReponse {
    const result: IAuthReponse = {
      isError: isError,
      data: data,
      error: error,
    };
    return result;
  }
}
