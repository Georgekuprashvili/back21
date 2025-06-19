import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';

export enum Gender {
  MALE = 'm',
  FEMALE = 'f',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;

  @IsEnum(Gender)
  gender: Gender;
}
