import { Controller, Inject, Post } from '@nestjs/common';
import { UseCasesProxyModule } from 'src/infrastructure/use-cases-proxy/use-cases-proxy.module';
import { GenerateCartUseCase } from 'src/use-cases/generate-cart-use-case';
import { UseCaseProxy } from '../../use-cases-proxy/use-case-proxy';
import { CartModel } from 'src/domain/models/cart.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(
    @Inject(UseCasesProxyModule.GENERATE_CART_USE_CASE)
    private readonly generateCartUseCase: UseCaseProxy<GenerateCartUseCase>,
  ) {}

  @Post()
  async generateNewCart(): Promise<CartModel> {
    return await this.generateCartUseCase.getInstance().execute();
  }

  //   @Post(':cartId/product/:productId')
  //   async addProductToCart(
  //     @Param('productId') productId: number,
  //     @Param('cartId') cartId: number,
  //     @Body() body: { quantity: number },
  //   ): Promise<ProductCartModel> {
  //     return this.cartService.addProductToCart(productId, cartId, body.quantity);
  //   }

  //   @Delete(':cartId/product/:productId')
  //   async removeProductFromCart(
  //     @Param('productId') productId: number,
  //     @Param('cartId') cartId: number,
  //   ): Promise<void> {
  //     return this.cartService.removeProductFromCart(productId, cartId);
  //   }

  //   @Get(':cartId')
  //   async getCart(@Param('cartId') cartId: number): Promise<CartModel> {
  //     return this.cartService.getCart(cartId);
  //   }
}
