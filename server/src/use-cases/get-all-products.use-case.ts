import { ProductModel } from 'src/domain/models/product.model';
import { ProductRepository } from 'src/domain/repositories/product.repository';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(page: number, limit: number): Promise<ProductModel[]> {
    return await this.productRepository.findAllPageable(page, limit);
  }
}
