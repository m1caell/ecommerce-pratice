import { ProductCartModel } from './product-cart.model';

export class CartModel {
  id: number;
  products: ProductCartModel[];
  valueTotal: number;

  constructor(id: number, products: ProductCartModel[], valueTotal: number) {
    this.id = id;
    this.products = products;
    this.valueTotal = valueTotal;
  }
}
