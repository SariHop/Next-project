import mongoose, { Schema, Model } from 'mongoose';
import {Task} from '@/app/types/tasks';

const TaskSchema: Schema<Task> = new Schema({
  title:{type:String, required: true},
  done: {type:Boolean, required:true},
  description: {type:String, required:true}
});

const TaskModel: Model<Task> = mongoose.models.tasks || mongoose.model<Task>('tasks', TaskSchema);
export default TaskModel
