import { Document } from 'mongoose';

export interface Task extends Document {
  _id:string
  title: string;
  done: string;
  description: string;
}

export interface TaskForm {
  title: string;
  done: string;
  description: string;
}

