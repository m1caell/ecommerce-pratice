import { CartModel } from '../models/cart.model';

export interface CartRepository {
  generateNewCart(): Promise<CartModel>;
  addProductToCart(
    productId: number,
    cartId: number,
    quantity: number,
  ): Promise<CartModel>;
  removeProductFromCart(productId: number, cartId: number): Promise<CartModel>;
  getCart(cartId: number): Promise<CartModel | null>;
}
