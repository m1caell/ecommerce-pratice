import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { ProductModel } from 'src/domain/models/product.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRespository: Repository<ProductEntity>,
  ) {}

  async findAllPageable(page: number, limit: number): Promise<ProductModel[]> {
    const offset = (page - 1) * limit;

    const products = await this.productRespository.find({
      skip: offset < 0 ? 0 : offset,
      take: limit < 0 ? 0 : limit,
    });

    return products.map(
      (product) =>
        new ProductModel(product.id, product.name, product.value, product.url),
    );
  }

  async searchPageable(
    query: string,
    page: number,
    limit: number,
  ): Promise<ProductModel[]> {
    const offset = (page - 1) * limit;

    // create a query builder to get products that query is like the name of product
    const products = await this.productRespository
      .createQueryBuilder('product')
      .where('product.name like :query', { query: `%${query}%` })
      .skip(offset < 0 ? 0 : offset)
      .take(limit < 0 ? 0 : limit)
      .getMany();

    // const products = await this.productRespository.find({
    //   skip: offset < 0 ? 0 : offset,
    //   take: limit < 0 ? 0 : limit,
    //   where: { name: query },
    // });

    return products.map(
      (product) =>
        new ProductModel(product.id, product.name, product.value, product.url),
    );
  }
}
