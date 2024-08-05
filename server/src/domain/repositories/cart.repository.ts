import { CartModel } from '../models/cart.model';
import { ProductCartModel } from '../models/product-cart.model';

export interface CartRepository {
  generateNewCart(): Promise<CartModel>;
  addProductToCart(
    productId: number,
    cartId: number,
    quantity: number,
  ): Promise<ProductCartModel>;
  removeProductFromCart(productId: number, cartId: number): Promise<void>;
  getCart(cartId: number): Promise<CartModel>;
}
