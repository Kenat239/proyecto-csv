import mongoose, { Schema, Document } from 'mongoose';
import { fechaActual, horaActual } from '../funciones/globales';

export interface ILast extends Document {
    idGps:string;
 latitud: number;
 longitud:number;
 altitud: number;
 velocidad: string;
 fechaRegistro: string;
 horaRegistro: string
}

const lastShema: Schema = new Schema ({
    idGps: {type:Schema.Types.ObjectId,  ref: 'Gps'},
    latidud: {type:Number, required: [false, 'se necesita la latitud']},
    longitud: {type:Number, required: [true, 'se necesita la longitud']},
    altitud: {type:Number, required: [true, 'se necesita la altitud']},
    velocidad: {type:String, required: [true, 'se necesita la velocidad']},
    fechaRegistro: {type:String, default:fechaActual()},
    horaRegistro: {type:String, default:horaActual()},
    
}, {collection: 'Last'})

export default mongoose.model<ILast>('Last', lastShema);