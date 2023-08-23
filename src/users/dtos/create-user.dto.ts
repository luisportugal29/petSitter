import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
  
}
