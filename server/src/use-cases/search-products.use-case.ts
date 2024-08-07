import { ProductModel } from 'src/domain/models/product.model';
import { ProductRepository } from 'src/domain/repositories/product.repository';

export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    query: string,
    page: number,
    limit: number,
  ): Promise<ProductModel[]> {
    return await this.productRepository.searchPageable(query, page, limit);
  }
}
