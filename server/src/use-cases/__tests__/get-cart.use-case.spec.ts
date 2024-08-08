import { CartRepository } from 'src/domain/repositories/cart.repository';
import { GetCartUseCase } from '../get-cart.use-case';
import { CartModel } from 'src/domain/models/cart.model';

describe('GetCartUseCase', () => {
  let getCartUseCase: GetCartUseCase;
  let cartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    cartRepository = {
      generateNewCart: jest.fn(),
      addProductToCart: jest.fn(),
      removeProductFromCart: jest.fn(),
      getCart: jest.fn(),
    } as jest.Mocked<CartRepository>;

    getCartUseCase = new GetCartUseCase(cartRepository);
  });

  it('should call getCart with correct parameters', async () => {
    const cartId = 1;

    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.getCart.mockResolvedValue(cartModel);

    const result = await getCartUseCase.execute(cartId);

    expect(cartRepository.getCart).toHaveBeenCalledWith(cartId);
    expect(result).toBe(cartModel);
  });

  it('should return the correct CartModel', async () => {
    const cartId = 1;

    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.getCart.mockResolvedValue(cartModel);

    const result = await getCartUseCase.execute(cartId);

    expect(result).toBe(cartModel);
  });

  it('should return the correct CartModel with products into', async () => {
    const cartId = 1;

    const cartModel: CartModel = {
      id: 1,
      products: [
        {
          productId: 1,
          productCartId: 1,
          name: 'Product 1',
          value: 10,
          url: 'http://url.com',
          quantity: 2,
        },
        {
          productId: 2,
          productCartId: 1,
          name: 'Product 2',
          value: 10,
          url: 'http://url.com',
          quantity: 3,
        },
      ],
      valueTotal: 50,
    };

    cartRepository.getCart.mockResolvedValue(cartModel);

    const result = await getCartUseCase.execute(cartId);

    expect(result).toBe(cartModel);
    expect(result?.products.length).toBe(2);
  });
});
