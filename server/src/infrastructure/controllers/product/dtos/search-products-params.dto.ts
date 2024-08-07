import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class SearchProductsParamsDto {
  @IsString()
  @ApiProperty({ example: 1, description: 'Termo da pesquisa' })
  term: string;

  @IsNumberString()
  @ApiProperty({ example: 1, description: 'Número da página' })
  page: number;

  @IsNumberString()
  @ApiProperty({ example: 10, description: 'Número de itens por página' })
  limit: number;
}
