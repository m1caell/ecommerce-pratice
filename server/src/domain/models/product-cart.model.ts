import { CartModel } from './cart.model';
import { ProductModel } from './product.model';

export class ProductCartModel {
  id: number;
  cart: CartModel;
  product: ProductModel;
  quantity: number;

  constructor(
    id: number,
    cart: CartModel,
    product: ProductModel,
    quantity: number,
  ) {
    this.id = id;
    this.cart = cart;
    this.product = product;
    this.quantity = quantity;
  }
}
