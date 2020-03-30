import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface IHistorial extends Document {
   idGps:string;
    protocolo: string;
   imei: string;
    latitud: number;
    longitud: number;
    altitud: number;
    valida:string;
    velocidad: number;
    curso:string;
    direccion:string;
    precision:number
    alarma: string;
    status: string;
    status2: string;
    nivelbateria:number;
    distancia:number;
    distanciatotal:number;
    movimiento:string;
}

const historialSchema: Schema = new Schema({
    idGps:{type: Schema.Types.ObjectId,  ref: 'Gps'},
    protocolo: { type: String, required: [true, 'La serie de GPS es obligatorio']},
    imei: { type: String, unique:true, required: [true, 'El IMEI del GPS es obligatorio'] },
    latitud: { type: Number, required: [true, 'La latitud es requerida'] },
    longitud: { type: Number, required: [ true, 'La longitud es requerida'] },
    altitud: { type: Number, required: [ true, 'La altitud es requerida'] },
    valida: { type: String, required: [ true, 'La válida es requerida'] },
    velocidad: { type: String, required: [ true, 'la velocidad es requerida'] },
    curso: { type: String, required: [ true, 'El curso es requerido'] },
    direccion: { type: String, required: [ true, 'La dirección es requerida'] },
    precision: { type: Number, required: [ true, 'La precisión es requerida'] },
    alarma: { type: String, required: false },
    status: { type: String, default: 'ACTIVO'},
    status2: { type: String, default: 'DISPONIBLE'},
    nivelbateria: { type: Number, required: [ true, 'El nivel de la bateria es requerido'] },
    distancia: { type: Number, required: [ true, 'La distancia es requerida'] },
    distanciatotal: { type: Number, required: [ true, 'La distancia total es requerida'] },
    movimiento: { type: String, required: [ true, 'el movimiento es requerido'] },
}, { collection: 'Historial'} );

historialSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' } );
export default mongoose.model<IHistorial>('Historial', historialSchema);