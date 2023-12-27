import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './utils/exceptions/custom-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.enableCors({ origin: '*' });
  await app.listen(8000);
}
bootstrap();
