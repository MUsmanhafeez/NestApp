
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Prop()
  @IsEmail()
  email: string;
  @Prop()
  @IsEnum(["INTERN", "ENGINEER", "ADMIN"], { message: 'Valid role required' })
  role: "INTERN" | "ENGINEER" | "ADMIN";
}

export const UserSchema = SchemaFactory.createForClass(User);