import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsEmail({ message: ' Campo Obrigatório para e-mail.' })
  @ApiProperty({ default: 'pub@pubblueapi.com' })
  email: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @MinLength(7, { message: 'Campos inválidas' })
  @ApiProperty({ default: '1234567' })
  password: string;
}