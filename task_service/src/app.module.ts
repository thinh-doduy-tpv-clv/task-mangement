import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './config/database.config';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      ...DATABASE_CONFIG,
      entities: ['dist/**/*.entity.ts'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
