import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateRequestDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 1 })
  @IsOptional()
  tableId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 1 })
  @IsOptional()
  menuId: number;
}
