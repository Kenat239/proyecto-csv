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
const tipoauto_1 = __importDefault(require("../modelos/tipoauto"));
//=======================================================
// Crear vehiculo
//=======================================================
function CrearTipoauto({ nombre, marca, modelo, tipo, npuertas, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return tipoauto_1.default.create({
            nombre,
            marca,
            modelo,
            tipo,
            npuertas
        })
            .then((datos) => {
            return datos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CrearTipoauto = CrearTipoauto;
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
function CargarTipoauto() {
    return __awaiter(this, void 0, void 0, function* () {
        return tipoauto_1.default.find({ status: 'ACTIVO' })
            .then((vehiculos) => {
            return vehiculos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CargarTipoauto = CargarTipoauto;
//=======================================================
// buscar Vehiculo especifico por id
//=======================================================
function BuscarTipoauto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            tipoauto_1.default.findById({ _id: id }, 'nombre marca modelo tipo status')
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.BuscarTipoauto = BuscarTipoauto;
//=======================================================
// Desactivar o Activar Vehiculo
//=======================================================
function DesactivarTipoauto(id, stat) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            tipoauto_1.default.updateOne({ _id: id }, { $set: { status: stat } })
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.DesactivarTipoauto = DesactivarTipoauto;
