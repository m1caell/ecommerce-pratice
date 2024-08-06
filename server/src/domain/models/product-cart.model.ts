import { ProductModel } from './product.model';

export class ProductCartModel {
  id: number;
  product: ProductModel;
  quantity: number;

  constructor(id: number, product: ProductModel, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}
