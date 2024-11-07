import mongoose, { Schema, Model } from 'mongoose';
import {IUserModel} from '@/app/types/users';

const UserSchema: Schema<IUserModel> = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel: Model<IUserModel> = mongoose.models.users || mongoose.model<IUserModel>('users', UserSchema);
export default UserModel
