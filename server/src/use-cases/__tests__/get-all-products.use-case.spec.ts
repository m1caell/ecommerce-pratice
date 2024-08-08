import { ProductRepository } from 'src/domain/repositories/product.repository';
import { GetAllProductsUseCase } from '../get-all-products.use-case';
import { ProductModel } from 'src/domain/models/product.model';

describe('GetAllProductsUseCase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = {
      findAllPageable: jest.fn(),
      searchPageable: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
  });

  it('should call findAllPageable with correct parameters', async () => {
    const page = 1;
    const limit = 3;

    const products: ProductModel[] = [
      {
        id: 1,
        name: 'Product 1',
        value: 10,
        url: 'http://url.com',
      },
      {
        id: 2,
        name: 'Product 2',
        value: 10,
        url: 'http://url.com',
      },
      {
        id: 3,
        name: 'Product 3',
        value: 10,
        url: 'http://url.com',
      },
    ];

    productRepository.findAllPageable.mockResolvedValue(products);

    const result = await getAllProductsUseCase.execute(page, limit);

    expect(productRepository.findAllPageable).toHaveBeenCalledWith(page, limit);
    expect(result.length).toBe(3);
    expect(result).toBe(products);
  });

  it('should return the correct ProductModel', async () => {
    const page = 1;
    const limit = 10;

    const products: ProductModel[] = [
      {
        id: 1,
        name: 'Product 1',
        value: 10,
        url: 'http://url.com',
      },
    ];

    productRepository.findAllPageable.mockResolvedValue(products);

    const result = await getAllProductsUseCase.execute(page, limit);

    expect(result).toBe(products);
  });
});
