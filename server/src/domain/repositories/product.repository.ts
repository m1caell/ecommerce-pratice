import { ProductModel } from '../models/product.model';

export interface ProductRepository {
  findAllPageable(page: number, limit: number): Promise<ProductModel[]>;

  searchPageable(
    query: string,
    page: number,
    limit: number,
  ): Promise<ProductModel[]>;
}
