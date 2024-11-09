import { Document } from 'mongoose';

export interface Car extends Document {
  _id: string
  make: string;
  modal: string;
  year: number;
}

export interface CarForm {
  make: string;
  modal: string;
  year: number;
}
