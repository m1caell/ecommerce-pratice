import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { GetAllProductsUseCase } from 'src/use-cases/get-all-products.use-case';
import { ProductRepositoryImpl } from '../repositories/product-impl.repository';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static GET_ALL_PRODUCTS_USE_CASE = 'GetAllProductsUseCase';

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
      ],
      exports: [UseCasesProxyModule.GET_ALL_PRODUCTS_USE_CASE],
    };
  }
}
