import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddProductToCartPayloadDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID do carrinho' })
  cartId: number;

  @IsNumber()
  @ApiProperty({ example: 1, description: 'ID do produto a adicionar' })
  productId: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Quantidade desse produto a adicionar',
  })
  quantity: number;
}
