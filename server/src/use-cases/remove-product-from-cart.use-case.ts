import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';

export class RemoveProductFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cartId: number, productId: number): Promise<CartModel> {
    const cart = await this.cartRepository.getCart(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const product = cart.products.find(
      (product) => product.id === Number(productId),
    );

    if (!product) {
      throw new Error('Product not found in cart');
    }

    await this.cartRepository.removeProductFromCart(cartId, productId);

    cart.valueTotal -= product.product.value * product.quantity;

    return cart;
  }
}
