import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { number } from 'joi';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;
  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  email: string;
  @Prop({
    type: Number,
  })
  phoneNumber: number;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  })
  posts: mongoose.Schema.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
