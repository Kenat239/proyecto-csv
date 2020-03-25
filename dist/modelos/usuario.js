"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const globales_1 = require("../funciones/globales");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'SUDO_ROLE'],
    message: '{VALUE} no es un rol permitido'
};
const usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre de usuario es requerido'], uppercase: true },
    apellidoP: { type: String, required: [true, 'El apellido paterno es requerido'], uppercase: true },
    apellidoM: { type: String, required: [true, 'El apellido materni es requerido'], uppercase: true },
    email: { type: String, unique: true, required: [true, 'El email es requerido'], lowercase: true },
    password: { type: String, required: [true, 'El password es requerido'] },
    role: { type: String, enum: rolesValidos, default: 'USER_ROLE' },
    status: { type: String, default: 'inactivo', required: true },
    empresa: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Empresa' },
    fcreate: { type: String, default: globales_1.fechaActual() },
    img: { type: String, required: false }
}, { collection: 'usuarios' });
usuarioSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.default.model('Usuario', usuarioSchema);
