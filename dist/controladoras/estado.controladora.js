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
const estados_1 = __importDefault(require("../modelos/estados"));
const estados_2 = __importDefault(require("../modelos/estados"));
//=======================================================
// Crear Estado
//=======================================================
function crearEstado({ N_Estado, capital, municipio, codigopostal, status }) {
    return __awaiter(this, void 0, void 0, function* () {
        return estados_1.default.create({
            N_Estado,
            capital,
            municipio,
            codigopostal,
            status
        })
            .then((datos) => {
            return datos;
        })
            .catch((err) => {
            throw err;
        });
    });
}
exports.crearEstado = crearEstado;
//=======================================================
// Consultar todos los Estados
//=======================================================
function cargarEstado() {
    return __awaiter(this, void 0, void 0, function* () {
        return estados_1.default.find()
            .then((estados) => {
            return estados;
        })
            .catch((err) => {
            throw err;
        });
    });
}
exports.cargarEstado = cargarEstado;
//=======================================================
// buscar Estado especifico por id
//=======================================================
function buscarEstado(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            estados_1.default.findById({ _id: id }, 'N_Estado municipio codigopostal status')
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
}
exports.buscarEstado = buscarEstado;
//=======================================================
// Consultar todos los Estados activos
//=======================================================
function ActivEmpresa() {
    return __awaiter(this, void 0, void 0, function* () {
        return estados_2.default.find({ status: 'ACTIVO' })
            .then((estado) => {
            return estado;
        })
            .catch((error) => {
            throw (error);
        });
    });
}
exports.ActivEmpresa = ActivEmpresa;
//=======================================================
// Desactivar o Activar Estado
//=======================================================
function desactivaEstado(id, stat) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            estados_1.default.updateOne({ _id: id }, { $set: { status: stat } })
                .then((estadoD) => {
                resolve(estadoD);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.desactivaEstado = desactivaEstado;
