import { Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  done: boolean;
  description: string;
}