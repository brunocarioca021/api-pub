import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class UpdateUserDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'João' })
  firstName: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'Breno' })
  lastName: string;

  @IsDateString({ message: 'Este campo precisa ser do tipo data' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: '2019-07-31T00:00:00.000Z' })
  birthdate: Date;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'pub@pub.com' })
  email: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: '' })
  imageUrl: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsOptional({ message: 'Este campo é opcional.' })
  @ApiProperty({ default: 'USER' })
  role: Role;
}
