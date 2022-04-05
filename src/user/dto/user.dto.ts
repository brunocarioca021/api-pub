import {
  IsString,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  id: number;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  firstName: string;

  @IsString({ message: 'Campo Obrigatório.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  lastName: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsEmail({ message: 'O formato não é compatível com de um e-mail.' })
  email: string;

  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  @IsUrl({ message: 'O formato não é compatível com de uma url.' })
  imageUrl: string;

  @IsDate({ message: 'Este campo data.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  createdAt: Date;

  @IsDate({ message: 'Este campo data.' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  updatedAt: Date;
}
