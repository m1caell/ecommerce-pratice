import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/use-cases-proxy/use-cases-proxy.module';
import { GenerateCartUseCase } from 'src/use-cases/generate-cart-use-case';
import { UseCaseProxy } from '../../use-cases-proxy/use-case-proxy';
import { CartModel } from 'src/domain/models/cart.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductCartModel } from 'src/domain/models/product-cart.model';
import { AddProductToCartPayloadDto } from './dtos/add-product-to-cart-payload.dto';
import { AddProductToCartUseCase } from 'src/use-cases/add-product-to-cart-use-case';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    @Inject(UseCasesProxyModule.GENERATE_CART_USE_CASE)
    private readonly generateCartUseCase: UseCaseProxy<GenerateCartUseCase>,

    @Inject(UseCasesProxyModule.ADD_PRODUCT_TO_CART_USE_CASE)
    private readonly addProductToCartUseCase: UseCaseProxy<AddProductToCartUseCase>,
  ) {}

  @Post('generate')
  async generateNewCart(): Promise<CartModel> {
    return await this.generateCartUseCase.getInstance().execute();
  }

  @Post('add-product')
  async addProductToCart(
    @Body()
    addProductPayload: AddProductToCartPayloadDto,
  ): Promise<ProductCartModel> {
    return await this.addProductToCartUseCase
      .getInstance()
      .execute(
        addProductPayload.productId,
        addProductPayload.cartId,
        addProductPayload.quantity,
      );
  }
}
