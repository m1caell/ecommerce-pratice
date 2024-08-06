import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';

export class GenerateCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(): Promise<CartModel> {
    return await this.cartRepository.generateNewCart();
  }
}
