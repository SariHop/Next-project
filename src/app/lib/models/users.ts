import mongoose, { Schema, Model } from 'mongoose';
import {IUserModel} from '@/app/types/users';

const UserSchema: Schema<IUserModel> = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUserModel> = mongoose.models.Users || mongoose.model<IUserModel>('users', UserSchema);
export default User
