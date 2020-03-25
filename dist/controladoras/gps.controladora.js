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
const gps_1 = __importDefault(require("../modelos/gps"));
//=======================================================
// Crear GPS
//=======================================================
function CrearGps({ serie, imei, latitud, longitud, velocidad, alarma, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return gps_1.default.create({
            serie,
            imei,
            latitud,
            longitud,
            velocidad,
            alarma,
        })
            .then((datos) => {
            return datos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CrearGps = CrearGps;
//=======================================================
// Consultar todos los GPS's Activos
//=======================================================
function CargarGpss() {
    return __awaiter(this, void 0, void 0, function* () {
        return gps_1.default.find({ status: 'ACTIVO' })
            .then((gpss) => {
            return gpss;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CargarGpss = CargarGpss;
//=======================================================
// Consultar todos los GPS's disponibles
//=======================================================
function DispGpss() {
    return __awaiter(this, void 0, void 0, function* () {
        return gps_1.default.find({ status2: 'DISPONIBLE' })
            .then((gpsD) => {
            return gpsD;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.DispGpss = DispGpss;
//=======================================================
// Buscar GPS especifico
//=======================================================
function BuscarGps(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            gps_1.default.findById({ _id: id }, 'serie latitud longitud velocidad alarma status')
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.BuscarGps = BuscarGps;
//=======================================================
// Desactivar o Activar GPS
//=======================================================
function DesactivarGps(id, stat) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            gps_1.default.updateOne({ _id: id }, { $set: { status: stat } })
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.DesactivarGps = DesactivarGps;
