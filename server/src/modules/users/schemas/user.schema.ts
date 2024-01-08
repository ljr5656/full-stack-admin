// src/users/schemas/user.schema.ts
import { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
