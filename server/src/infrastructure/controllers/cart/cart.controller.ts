import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/use-cases-proxy/use-cases-proxy.module';
import { GenerateCartUseCase } from 'src/use-cases/generate-cart.use-case';
import { UseCaseProxy } from '../../use-cases-proxy/use-case-proxy';
import { CartModel } from 'src/domain/models/cart.model';
import { ApiTags } from '@nestjs/swagger';
import { ProductCartModel } from 'src/domain/models/product-cart.model';
import { AddProductToCartPayloadDto } from './dtos/add-product-to-cart-payload.dto';
import { AddProductToCartUseCase } from 'src/use-cases/add-product-to-cart.use-case';
import { GetCartUseCase } from 'src/use-cases/get-cart.use-case';
import { RemoveProductFromCartUseCase } from 'src/use-cases/remove-product-from-cart.use-case';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    @Inject(UseCasesProxyModule.GENERATE_CART_USE_CASE)
    private readonly generateCartUseCase: UseCaseProxy<GenerateCartUseCase>,

    @Inject(UseCasesProxyModule.ADD_PRODUCT_TO_CART_USE_CASE)
    private readonly addProductToCartUseCase: UseCaseProxy<AddProductToCartUseCase>,

    @Inject(UseCasesProxyModule.GET_CART_USE_CASE)
    private readonly getCartUseCase: UseCaseProxy<GetCartUseCase>,

    @Inject(UseCasesProxyModule.REMOVE_PRODUCT_FROM_CART_USE_CASE)
    private readonly removeProductFromCartUseCase: UseCaseProxy<RemoveProductFromCartUseCase>,
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

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: number): Promise<CartModel> {
    return await this.getCartUseCase.getInstance().execute(+cartId);
  }

  @Delete(':cartId/product/:productId')
  async deleteProductFromCart(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    await this.removeProductFromCartUseCase
      .getInstance()
      .execute(+cartId, +productId);
  }
}
