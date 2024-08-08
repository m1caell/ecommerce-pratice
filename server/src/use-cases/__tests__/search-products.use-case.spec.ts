import { ProductRepository } from 'src/domain/repositories/product.repository';
import { SearchProductsUseCase } from '../search-products.use-case';
import { ProductModel } from 'src/domain/models/product.model';

describe('SearchProductsUseCase', () => {
  let searchProductsUseCase: SearchProductsUseCase;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = {
      searchPageable: jest.fn(),
      findAllPageable: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    searchProductsUseCase = new SearchProductsUseCase(productRepository);
  });

  it('should call searchProducts with correct parameters', async () => {
    const search = 'Product';
    const products: ProductModel[] = [
      {
        id: 1,
        name: 'Product 1',
        value: 10,
        url: 'http://image.com',
      },
      {
        id: 2,
        name: 'Product 2',
        value: 20,
        url: 'http://image.com',
      },
    ];

    productRepository.searchPageable.mockResolvedValue(products);

    const result = await searchProductsUseCase.execute(search, 1, 5);

    expect(productRepository.searchPageable).toHaveBeenCalledWith(search, 1, 5);
    expect(result).toBe(products);
  });

  it('should return the correct ProductModel[]', async () => {
    const search = 'Product';
    const products: ProductModel[] = [
      {
        id: 1,
        name: 'Product 1',
        value: 10,
        url: 'http://image.com',
      },
      {
        id: 2,
        name: 'Product 2',
        value: 20,
        url: 'http://image.com',
      },
    ];

    productRepository.searchPageable.mockResolvedValue(products);

    const result = await searchProductsUseCase.execute(search, 1, 10);

    expect(result).toBe(products);
  });
});
