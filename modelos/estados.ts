import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface IEstado extends Document {
    nombreEstado: string;
    capital: string;
    municipio: string;
    codigopostal: number;
    status: string;
}

const EstadoSchema: Schema = new Schema({
    N_Estado: { type: String, required: [true, 'El nombre del estado es obligatorio']},
    capital: { type:String, required: [true,'la cpital es obligatoria']},
    municipio: { type: String, required: [true, 'El municipio es obligatorio'] },
    codigopostal: { type: Number,  required: [true, 'el codigo postal es necesario']},
    status: { type: String, default: 'ACTIVO'}
}, { collection: 'Estado'} );

EstadoSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' } );
export default mongoose.model<IEstado>('Estado', EstadoSchema);