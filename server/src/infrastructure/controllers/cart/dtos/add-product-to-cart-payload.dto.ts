import { ApiProperty } from '@nestjs/swagger';

export class AddProductToCartPayloadDto {
  @ApiProperty({ example: 1, description: 'ID do carrinho' })
  cartId: number;

  @ApiProperty({ example: 1, description: 'ID do produto a adicionar' })
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'Quantidade desse produto a adicionar',
  })
  quantity: number;
}
