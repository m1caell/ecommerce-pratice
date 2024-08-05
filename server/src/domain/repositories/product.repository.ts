import { ProductModel } from '../models/product.model';

export interface ProductRepository {
  findAll(): Promise<ProductModel[]>;
}
