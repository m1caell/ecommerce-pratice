import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { GetAllProductsUseCase } from 'src/use-cases/get-all-products.use-case';
import { ProductRepositoryImpl } from '../repositories/product-impl.repository';
import { CartRepositoryImpl } from '../repositories/cart-impl.repository';
import { GenerateCartUseCase } from 'src/use-cases/generate-cart.use-case';
import { AddProductToCartUseCase } from 'src/use-cases/add-product-to-cart.use-case';
import { GetCartUseCase } from 'src/use-cases/get-cart.use-case';
import { RemoveProductFromCartUseCase } from 'src/use-cases/remove-product-from-cart.use-case';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static GET_ALL_PRODUCTS_USE_CASE = 'GetAllProductsUseCase';
  static GENERATE_CART_USE_CASE = 'GenerateCartUseCase';
  static ADD_PRODUCT_TO_CART_USE_CASE = 'AddProductToCartUseCase';
  static GET_CART_USE_CASE = 'GetCartUseCase';
  static REMOVE_PRODUCT_FROM_CART_USE_CASE = 'RemoveProductFromCartUseCase';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [ProductRepositoryImpl],
          provide: UseCasesProxyModule.GET_ALL_PRODUCTS_USE_CASE,
          useFactory: (productRepository: ProductRepositoryImpl) => {
            return new UseCaseProxy(
              new GetAllProductsUseCase(productRepository),
            );
          },
        },
        {
          inject: [CartRepositoryImpl],
          provide: UseCasesProxyModule.GENERATE_CART_USE_CASE,
          useFactory: (cartRepository: CartRepositoryImpl) => {
            return new UseCaseProxy(new GenerateCartUseCase(cartRepository));
          },
        },
        {
          inject: [CartRepositoryImpl],
          provide: UseCasesProxyModule.ADD_PRODUCT_TO_CART_USE_CASE,
          useFactory: (cartRepository: CartRepositoryImpl) => {
            return new UseCaseProxy(
              new AddProductToCartUseCase(cartRepository),
            );
          },
        },
        {
          inject: [CartRepositoryImpl],
          provide: UseCasesProxyModule.GET_CART_USE_CASE,
          useFactory: (cartRepository: CartRepositoryImpl) => {
            return new UseCaseProxy(new GetCartUseCase(cartRepository));
          },
        },
        {
          inject: [CartRepositoryImpl],
          provide: UseCasesProxyModule.REMOVE_PRODUCT_FROM_CART_USE_CASE,
          useFactory: (cartRepository: CartRepositoryImpl) => {
            return new UseCaseProxy(
              new RemoveProductFromCartUseCase(cartRepository),
            );
          },
        },
      ],
      exports: [
        UseCasesProxyModule.GET_ALL_PRODUCTS_USE_CASE,
        UseCasesProxyModule.GENERATE_CART_USE_CASE,
        UseCasesProxyModule.ADD_PRODUCT_TO_CART_USE_CASE,
        UseCasesProxyModule.GET_CART_USE_CASE,
        UseCasesProxyModule.REMOVE_PRODUCT_FROM_CART_USE_CASE,
      ],
    };
  }
}
