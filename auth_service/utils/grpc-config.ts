import { GrpcOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

export const grpcClientConfig: GrpcOptions = {
  // Initiate the GRPC service for auth module
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:9001',
    protoPath: ['src/proto/auth.proto', 'src/proto/biz.proto'],
    package: ['auth', 'biz'],
  },
};
