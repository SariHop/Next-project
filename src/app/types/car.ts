import { Document } from 'mongoose';

export interface Car extends Document {
  make: string;
  modal: string;
  year: number;
}
