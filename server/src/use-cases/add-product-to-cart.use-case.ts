import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';

export class AddProductToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(
    productId: number,
    cartId: number,
    quantity: number,
  ): Promise<CartModel> {
    return this.cartRepository.addProductToCart(productId, cartId, quantity);
  }
}
