import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';

const knownCategories = ['technique', 'food', 'transport'];

export class CreateExpenseDto {
  @IsIn(knownCategories)
  category: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
