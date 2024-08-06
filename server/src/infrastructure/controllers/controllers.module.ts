import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../use-cases-proxy/use-cases-proxy.module';
import { ProductController } from './product/product.controller';
import { CartController } from './cart/cart.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [ProductController, CartController],
})
export class ControllersModule {}
