import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({
          type: configService.get('TYPE_DB'),
          host: configService.get('HOST'),
          port: configService.get('PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: ['dist/**/*.entity.js'],
          synchronize: true,
        } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
