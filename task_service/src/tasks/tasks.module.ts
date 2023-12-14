import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AUTH_PACKAGE_NAME } from './types/auth';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:9001',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'src/tasks/proto/auth.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
