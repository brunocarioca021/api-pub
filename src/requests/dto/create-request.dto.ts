import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório.' })
  @ApiProperty({ default: 1 })
  tableId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório.' })
  @ApiProperty({ default: 1 })
  menuId: number;
}
