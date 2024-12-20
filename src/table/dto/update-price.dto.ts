import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePriceDto {
  @IsBoolean({ message: 'Campo tipo booleano.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Campo é opcional.' })
  @ApiProperty({ default: false })
  share: boolean;

  @IsBoolean({ message: 'Campo tipo booleano.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Campo é opcional.' })
  @ApiProperty({ default: false })
  cash: boolean;
}
