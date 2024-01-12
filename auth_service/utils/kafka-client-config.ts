import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      ssl: true,
      clientId: 'task-auth-service',
      brokers: ['pkc-ldvr1.asia-southeast1.gcp.confluent.cloud:9092'],
      connectionTimeout: 60000,
      retry: {
        maxRetryTime: 1000,
      },
      sasl: {
        username: '2UCHMN6GDPSKPEPN',
        password:
          'zdYXMMLToGaZDbE//5SSi99r9aIcRc02IKOIM9QAcaolTHBSzuKbiJyvnEalRsB8',
        mechanism: 'plain',
      },
    },
  },
};
