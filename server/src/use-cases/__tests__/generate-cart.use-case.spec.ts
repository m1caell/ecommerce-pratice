import { CartRepository } from 'src/domain/repositories/cart.repository';
import { GenerateCartUseCase } from '../generate-cart.use-case';
import { CartModel } from 'src/domain/models/cart.model';

describe('GenerateCartUseCase', () => {
  let generateCartUseCase: GenerateCartUseCase;
  let cartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    cartRepository = {
      generateNewCart: jest.fn(),
      addProductToCart: jest.fn(),
      removeProductFromCart: jest.fn(),
      getCart: jest.fn(),
    } as jest.Mocked<CartRepository>;

    generateCartUseCase = new GenerateCartUseCase(cartRepository);
  });

  it('should call generateNewCart with correct parameters', async () => {
    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.generateNewCart.mockResolvedValue(cartModel);

    const result = await generateCartUseCase.execute();

    expect(cartRepository.generateNewCart).toHaveBeenCalledWith();
    expect(result).toBe(cartModel);
  });

  it('should return the correct CartModel', async () => {
    const cartModel: CartModel = {
      id: 1,
      products: [],
      valueTotal: 0,
    };

    cartRepository.generateNewCart.mockResolvedValue(cartModel);

    const result = await generateCartUseCase.execute();

    expect(result).toBe(cartModel);
  });
});
