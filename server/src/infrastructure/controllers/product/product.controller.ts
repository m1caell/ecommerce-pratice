import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/use-cases-proxy/use-case-proxy';
import { UseCasesProxyModule } from 'src/infrastructure/use-cases-proxy/use-cases-proxy.module';
import { GetAllProductsUseCase } from 'src/use-cases/get-all-products.use-case';
import { GetAllProductsParamsDto } from './dtos/get-all-products-params.dto';
import { SearchProductsParamsDto } from './dtos/search-products-params.dto';
import { SearchProductsUseCase } from 'src/use-cases/search-products.use-case';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    @Inject(UseCasesProxyModule.GET_ALL_PRODUCTS_USE_CASE)
    private readonly getAllProductsUseCase: UseCaseProxy<GetAllProductsUseCase>,

    @Inject(UseCasesProxyModule.SEARCH_PRODUCTS_USE_CASE)
    private readonly searchProductsUseCase: UseCaseProxy<SearchProductsUseCase>,
  ) {}

  @Get()
  async getAllProducts(@Query() params: GetAllProductsParamsDto) {
    return await this.getAllProductsUseCase
      .getInstance()
      .execute(params.page, params.limit);
  }

  @Get('/search')
  async searchProducts(@Query() params: SearchProductsParamsDto) {
    return await this.searchProductsUseCase
      .getInstance()
      .execute(params.term, params.page, params.limit);
  }
}
