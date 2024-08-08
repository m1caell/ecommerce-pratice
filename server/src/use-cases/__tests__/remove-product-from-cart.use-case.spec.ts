import { CartRepository } from 'src/domain/repositories/cart.repository';
import { RemoveProductFromCartUseCase } from '../remove-product-from-cart.use-case';
import { CartModel } from 'src/domain/models/cart.model';

describe('RemoveProductFromCartUseCase', () => {
  let removeProductFromCartUseCase: RemoveProductFromCartUseCase;
  let cartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    cartRepository = {
      generateNewCart: jest.fn(),
      addProductToCart: jest.fn(),
      removeProductFromCart: jest.fn(),
      getCart: jest.fn(),
    } as jest.Mocked<CartRepository>;

    removeProductFromCartUseCase = new RemoveProductFromCartUseCase(
      cartRepository,
    );
  });

  it('should call removeProductFromCart with correct parameters', async () => {
    const productId = 1;
    const cartId = 1;

    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.getCart.mockResolvedValue(cartModel);

    const result = await removeProductFromCartUseCase.execute(
      cartId,
      productId,
    );

    expect(cartRepository.removeProductFromCart).toHaveBeenCalledWith(
      cartId,
      productId,
    );
    expect(result).toBe(cartModel);
  });

  it('should return the correct CartModel', async () => {
    const productId = 1;
    const cartId = 1;

    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.getCart.mockResolvedValue(cartModel);

    const result = await removeProductFromCartUseCase.execute(
      cartId,
      productId,
    );

    expect(result).toBe(cartModel);
  });
});
