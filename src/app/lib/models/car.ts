import mongoose, { Schema, Model } from 'mongoose';
import {Car} from '@/app/types/car';

const CarsSchema: Schema<Car> = new Schema({
  make:{type:String, required: true},
  modal: {type:String, required:true},
  year: {type:Number, required:true}

});

const CarsModel: Model<Car> = mongoose.models.cars || mongoose.model<Car>('cars', CarsSchema);
export default CarsModel
