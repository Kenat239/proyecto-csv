import mongoose, { Schema, Document } from 'mongoose';
import { fechaActual }  from '../funciones/globales';
import mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IVehiculo extends Document {
    placas: string;
    noSerie: string;
    fechaAlta: string;
    gps: string;
    empresa: string;
    status: string;
}

const vehiculoSchema: Schema = new Schema({
    placas: { type: String, unique: true, required: [ true, 'La placa es obligatoria']},
    noSerie: { type: String, unique: true, required: [  true, 'El numeor de serie debe ser unico']},
    fechaAlta: { type: String, default: fechaActual() },
    status: { type: String, default: 'ACTIVO'},
    gps: { type: Schema.Types.ObjectId,  ref: 'Gps'},
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa'}
}, { collection: 'vehiculos'} );

vehiculoSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico'} );

export default mongoose.model<IVehiculo>( 'Vehiculo', vehiculoSchema );
