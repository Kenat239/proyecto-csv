import mongoose, { Schema, Document } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface IEmpresa extends Document {
    nombre: string;
    estado: string;
    status: string;
}

const EmpresaSchema: Schema = new Schema({
    nombre: { type: String, unique:true, required: [true, 'El nombre de la empresa es obligatorio']},
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    status: { type: String, default: 'ACTIVO'}
}, { collection: 'empresa'} );

EmpresaSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' } );
export default mongoose.model<IEmpresa>('Empresa', EmpresaSchema);