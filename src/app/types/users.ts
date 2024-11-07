import { Document } from 'mongoose';

export interface IUserModel extends Document {
  userName: string;
  email: string;
  password: string;
}