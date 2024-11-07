import mongoose, { Schema, Model } from 'mongoose';
import {Book} from '@/app/types/books';

const BookSchema: Schema<Book> = new Schema({
  title:{type:String, required: true},
  author: {type:String, required:true},
  publicationYear: {type:Number, required:true}

});

const BooksModel: Model<Book> = mongoose.models.books || mongoose.model<Book>('books', BookSchema);
export default BooksModel
