import { User } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginResponseDto {
  @IsString({ message: 'Campo Obrigatório' })
  @IsNotEmpty({ message: 'Campo Obrigatório' })
  token: string;

  @IsNotEmpty({ message: 'Campo Obrigatório' })
  user: User;
}
