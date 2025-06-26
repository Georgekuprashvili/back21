import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Expense {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  totalPrice: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
