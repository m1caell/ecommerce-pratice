import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';

export class GetCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cartId: number): Promise<CartModel> {
    return await this.cartRepository.getCart(cartId);
  }
}
