import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductModel } from 'src/domain/models/product.model';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
  ) {}

  async findAll(): Promise<ProductModel[]> {
    const products = await this.productRespository.find();

    return products.map(
      (product) =>
        new ProductModel(product.id, product.name, product.value, product.url),
    );
  }
}
