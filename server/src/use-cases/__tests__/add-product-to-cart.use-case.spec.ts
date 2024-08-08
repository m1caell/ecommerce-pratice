import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { AddProductToCartUseCase } from '../add-product-to-cart.use-case';

describe('AddProductToCartUseCase', () => {
  let addProductToCartUseCase: AddProductToCartUseCase;
  let cartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    cartRepository = {
      generateNewCart: jest.fn(),
      addProductToCart: jest.fn(),
      removeProductFromCart: jest.fn(),
      getCart: jest.fn(),
    } as jest.Mocked<CartRepository>;

    addProductToCartUseCase = new AddProductToCartUseCase(cartRepository);
  });

  it('should call addProductToCart with correct parameters', async () => {
    const productId = 1;
    const cartId = 1;
    const quantity = 2;

    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.addProductToCart.mockResolvedValue(cartModel);

    const result = await addProductToCartUseCase.execute(
      productId,
      cartId,
      quantity,
    );

    expect(cartRepository.addProductToCart).toHaveBeenCalledWith(
      productId,
      cartId,
      quantity,
    );
    expect(result).toBe(cartModel);
  });

  it('should return the correct CartModel', async () => {
    const productId = 1;
    const cartId = 1;
    const quantity = 2;
    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.addProductToCart.mockResolvedValue(cartModel);

    const result = await addProductToCartUseCase.execute(
      productId,
      cartId,
      quantity,
    );

    expect(result).toBe(cartModel);
  });
});
