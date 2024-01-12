import { Module } from '@nestjs/common';
import { KafkaClientModule } from 'src/kafka-client/kafka-client.module';
import { BizController } from './biz.controller';
import { BizService } from './biz.service';

@Module({
  imports: [KafkaClientModule],
  providers: [BizService],
  controllers: [BizController],
})
export class BizModule {}
