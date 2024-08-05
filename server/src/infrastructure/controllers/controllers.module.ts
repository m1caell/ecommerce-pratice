import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../use-cases-proxy/use-cases-proxy.module';
import { ProductController } from './product/product.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [ProductController],
})
export class ControllersModule {}
