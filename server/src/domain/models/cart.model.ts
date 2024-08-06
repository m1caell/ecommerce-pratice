import { ProductCartModel } from './product-cart.model';

export class CartModel {
  id: number;
  products: Omit<ProductCartModel, 'cart'>[];
  valueTotal: number;

  constructor(id?: number, products?: ProductCartModel[], valueTotal?: number) {
    this.id = id || 0;
    this.products = products || [];
    this.valueTotal = valueTotal || 0;
  }
}
