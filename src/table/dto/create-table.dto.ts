import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTableDto {
  @IsBoolean({ message: 'Campo tipo booleano.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: true })
  share: boolean;

  @IsBoolean({ message: 'Campo tipo booleano.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: true })
  cash: boolean;
}
