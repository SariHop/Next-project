import { Document } from 'mongoose';

export interface Book extends Document {
    _id: string
    title: string;
    author: string;
    publicationYear: number;
}

export interface BookForm {
    title: string;
    author: string;
    publicationYear: number;
}


  