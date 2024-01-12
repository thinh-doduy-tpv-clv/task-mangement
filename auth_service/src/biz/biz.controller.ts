import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { KafkaJSConnectionError, Message } from 'kafkajs';
import { lastValueFrom } from 'rxjs';
import {
  BizServiceController,
  BizServiceControllerMethods,
  MyData,
  SendDto,
} from 'src/shared/types/biz';

@Controller('biz')
@BizServiceControllerMethods()
export class BizController implements BizServiceController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('request-task');
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  sleepAndCallFunction(time: number, func: any) {
    this.sleep(time);
    return func();
  }

  @EventPattern('create-task')
  async handleCreateTask(data: any, context: Message) {
    this.sleepAndCallFunction(10000, () => {
      console.log('Received message from create-task topic:', data);
    });
  }

  @EventPattern('cancel-task')
  async handleCancelTask(data: any, context: Message) {
    this.sleep(3000);
    console.log('Task cancelled, task details: ', data);
    // Handle the message here
  }

  async sendAmount(request: SendDto): Promise<void> {
    console.log('sendAmount request:', request);
    try {
      console.log('client connected');
      const result = await this.kafkaClient.emit('request-task', {
        key: 'biz-grpc-service',
        value: {
          key: 'biz-grpc-service',
          task: 'new task 01',
          status: 'TODO',
        },
      });
      console.log('message sent to topic');
      const resultPromised = await lastValueFrom(result);
      console.log('data returned: ', resultPromised);
    } catch (err) {
      console.error('Error:', err);
      if (err instanceof KafkaJSConnectionError) {
        console.error('Failed to connect to Kafka');
      } else {
        console.error('Unknown error');
      }
    }
  }
}
