import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';

export class RemoveProductFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cartId: number, productId: number): Promise<CartModel | null> {
    await this.cartRepository.removeProductFromCart(cartId, productId);
    const cart = await this.cartRepository.getCart(cartId);

    return cart;
  }
}
