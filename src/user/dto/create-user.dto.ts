import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { Role } from 'src/enum/roles.enum';

export class CreateUserDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 'Bruno' })
  firstName: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 'Dutra' })
  lastName: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  @ApiProperty({ default: 'pub@pubblueapi.com' })
  email: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @MinLength(7, { message: 'A senha deve ter no minimo 7 caracteres.' })
  @ApiProperty({ default: '1234567' })
  password: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @MinLength(7, { message: 'A senha deve ter no minimo 6 caracteres.' })
  @ApiProperty({ default: '1234567' })
  passwordConfirmation: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  @ApiProperty({
    default:
      'https://files.tecnoblog.net/wp-content/uploads/2021/03/hacker-3342696_1920-e1614714640861-700x394.jpg',
  })
  imageUrl: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @ApiProperty({ default: 'USER' })
  role: Role;
}
