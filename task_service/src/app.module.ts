import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'task-mngt',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(ormconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
