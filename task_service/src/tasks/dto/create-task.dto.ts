import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator/types/decorator/decorators';
import { TASK_STATUS } from '../utils/constants/constants';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TASK_STATUS)
  status: string;
}
