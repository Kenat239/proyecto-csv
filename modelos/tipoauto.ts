import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface ITipoauto extends Document {
    nombre: string;
    marca: string;
    modelo: number;
    npuertas: number;
    tipo: string;
    status: string;
}

const TipoautoSchema: Schema = new Schema({
    nombre: { type: String, required: [true, 'El nombre del vehiculo es obligatorio']},
    marca: { type: String, required: [true, 'La marca del vehiculo es obligatorio']},
    modelo: { type: Number, required: [true, 'El modelo del vehiculo es obligatorio']},
    npuertas: { type: Number, required: [true, 'El numero de puertas es obligatorio']},
    tipo: { type: String, required: [true, 'El tipo del vehiculo es obligatorio']},
    status: { type: String, default: 'ACTIVO'},
}, { collection: 'tipoauto'} );


TipoautoSchema.plugin( mongooseUniqueValidator );
export default mongoose.model<ITipoauto>('Tipoauto', TipoautoSchema);