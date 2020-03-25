import mongoose, { Schema, Document } from 'mongoose';
import { fechaActual } from '../funciones/globales';
import mongooseUniqueValidator = require('mongoose-unique-validator');

export interface IUsuario extends Document {
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    email: string;
    password: string;
    role: string;
    status: string;
    empresa: string;
    img?: string;
    uIngreso?: string;
    socketid?: string;
    
}

const rolesValidos = {
    values: [ 'ADMIN_ROLE', 'USER_ROLE', 'SUDO_ROLE' ],
    message: '{VALUE} no es un rol permitido'
}

const usuarioSchema: Schema = new Schema({
    nombre: { type: String, required: [ true, 'El nombre de usuario es requerido'], uppercase: true },
    apellidoP: { type: String, required: [ true, 'El apellido paterno es requerido'], uppercase: true },
    apellidoM: { type: String, required: [ true, 'El apellido materni es requerido'], uppercase: true },
    email: { type: String, unique: true, required: [ true, 'El email es requerido'], lowercase: true },
    password: { type: String, required: [ true, 'El password es requerido'] },
    role: { type: String, enum: rolesValidos, default: 'USER_ROLE' },
    status: { type: String, default: 'inactivo', required: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'Empresa'},
    fcreate: { type: String, default: fechaActual() },
    img: { type: String, required: false }
    
}, { collection: 'usuarios'} );

usuarioSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' } );

export default mongoose.model<IUsuario>('Usuario', usuarioSchema);