import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetAllProductsParamsDto {
  @IsNumberString()
  @ApiProperty({ example: 1, description: 'Número da página' })
  page: number;

  @IsNumberString()
  @ApiProperty({ example: 10, description: 'Número de itens por página' })
  limit: number;
}
