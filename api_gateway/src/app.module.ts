import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      formatError: (error: GraphQLError) => {
        if (error?.extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
          if (error.message.startsWith('Expected value of type "Int!"')) {
            const graphQLFormattedError: GraphQLFormattedError = {
              message: 'Please provide input of user Id',
              extensions: {
                code: error?.extensions.code,
              },
            };
            return graphQLFormattedError;
          }
        }
      },
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
