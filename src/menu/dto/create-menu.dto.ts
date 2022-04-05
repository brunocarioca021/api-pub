import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsNumber } from 'class-validator';

export class CreateMenuDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 'Chopp' })
  title: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 'Caneca 500ml' })
  description: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @ApiProperty({
    default:
      'https://brindeshop.com.br/10548-large_default/caneca-de-chopp-500ml-personalizada.jpg',
  })
  imageUrl: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 10 })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 1 })
  categoryId: number;
}
