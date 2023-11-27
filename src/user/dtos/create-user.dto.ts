import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { RolesEnum } from '../enums/roles.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({}, { message: 'A senha precisa ser forte' })
  password: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: RolesEnum;
}
