"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../modelos/usuario"));
//===================================================================
// Login usuario
//===================================================================
function LoginUsuario({ email }) {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_1.default.findOne({
            email: email
        })
            .then((datos) => {
            return datos;
        })
            .catch((error) => {
            return error;
        });
    });
}
exports.LoginUsuario = LoginUsuario;
//===================================================================
// Crear usuario
//===================================================================
function CrearUsuario({ nombre, apellidoP, apellidoM, email, password, empresa }) {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_1.default.create({
            nombre,
            apellidoP,
            apellidoM,
            email,
            password,
            empresa
        })
            .then((datos) => {
            return datos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CrearUsuario = CrearUsuario;
//===================================================================
// Cargar usuarios
//===================================================================
function CargarUsuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        return usuario_1.default.find()
            .then((usuarios) => {
            return usuarios;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CargarUsuarios = CargarUsuarios;
//===================================================================
// Modificar Usuario
//===================================================================
function ActualizaUsuario(id, usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            usuario_1.default.findByIdAndUpdate(id, usuario, { new: true })
                .then((usuarioActualizado) => {
                resolve(usuarioActualizado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.ActualizaUsuario = ActualizaUsuario;
//===================================================================
// DESACTIVAR O ACTIVAR Usuario
//===================================================================
function DesactivarUsuario(id, stat) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            usuario_1.default.updateOne({ _id: id }, { $set: { status: stat } })
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.DesactivarUsuario = DesactivarUsuario;
