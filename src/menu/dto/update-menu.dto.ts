import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateMenuDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional()
  @ApiProperty({ default: 'Brahma Chopp' })
  title: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional()
  @ApiProperty({ default: 'Caneca de chopp 200ml' })
  description: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @IsOptional()
  @ApiProperty({
    default: 
    'https://images-americanas.b2w.io/produtos/28208388/imagens/jogo-2-canecas-gel-congelante-para-chopp-400ml-acrilico-krystalon/28208389_1_large.jpg',
  })
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional()
  @ApiProperty({ default: 4.99 })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional()
  @ApiProperty({ default: 1 })
  categoryId: number;
}
