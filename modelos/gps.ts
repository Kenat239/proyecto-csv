import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface IGps extends Document {
   serie: string;
   imei: string;
    latitud: number;
    longitud: number;
    velocidad: number;
    alarma: string;
    status: string;
    status2: string;
}

const gpsSchema: Schema = new Schema({
    serie: { type: String, unique:true, required: [true, 'La serie de GPS es obligatorio']},
    imei: { type: String, unique:true, required: [true, 'El IMEI del GPS es obligatorio'] },
    latitud: { type: Number, required: [true, 'La latitud es requerida'] },
    longitud: { type: Number, required: [ true, 'La longitud es requerida'] },
    velocidad: { type: String, required: [ true, 'la velocidad es requerida'] },
    alarma: { type: String, required: false },
    status: { type: String, default: 'ACTIVO'},
    status2: { type: String, default: 'DISPONIBLE'}
}, { collection: 'Gps'} );

gpsSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' } );
export default mongoose.model<IGps>('Gps', gpsSchema);