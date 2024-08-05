import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/use-cases-proxy/use-case-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/use-cases-proxy/use-cases-proxy.module';
import { GetAllProductsUseCase } from 'src/use-cases/get-all-products.use-case';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    @Inject(UseCasesProxyModule.GET_ALL_PRODUCTS_USE_CASE)
    private readonly getAllProductsUseCase: UseCaseProxy<GetAllProductsUseCase>,
  ) {}

  @Get()
  async getAllProducts() {
    return await this.getAllProductsUseCase.getInstance().execute();
  }
}
