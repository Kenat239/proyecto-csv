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
const vehiculo_1 = __importDefault(require("../modelos/vehiculo"));
const gps_1 = __importDefault(require("../modelos/gps"));
//=======================================================
// Crear vehiculo
//====================================================
function CrearVehiculo({ placas, noSerie, gps, empresa, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return vehiculo_1.default.create({
            placas,
            noSerie,
            gps,
            empresa
        })
            .then((datos) => {
            console.log(datos.gps);
            return new Promise((resolve, reject) => {
                gps_1.default.updateOne({ _id: datos.gps }, { $set: { status2: 'no disponible' } })
                    .then((gps) => {
                    resolve(gps);
                })
                    .catch((error) => {
                    reject(error);
                });
            }),
                datos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CrearVehiculo = CrearVehiculo;
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
function CargarVehiculos() {
    return __awaiter(this, void 0, void 0, function* () {
        return vehiculo_1.default.find({ status: 'ACTIVO' })
            .then((vehiculos) => {
            return vehiculos;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CargarVehiculos = CargarVehiculos;
//=======================================================
// buscar Vehiculo especifico por id
//=======================================================
function BuscarVehiculo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            vehiculo_1.default.findById({ _id: id }, 'placas noSerie empresa gps status status2')
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.BuscarVehiculo = BuscarVehiculo;
//=======================================================
// Desactivar o Activar Vehiculo
//=======================================================
function DesactivarVehiculo(id, stat) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            vehiculo_1.default.updateOne({ _id: id }, { $set: { status: stat } })
                .then((resultado) => {
                resolve(resultado);
            })
                .catch((error) => {
                reject(error);
            });
        });
    });
}
exports.DesactivarVehiculo = DesactivarVehiculo;
//=======================================================
// muestreo de todos los gps por empresa y vehiculos
//=======================================================
function muestreo(usuario) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(usuario);
        const empresa = usuario.empresa;
        const role = usuario.role;
        return new Promise((resolve, reject) => {
            switch (role) {
                case 'ADMIN_ROLE':
                    vehiculo_1.default.find({})
                        .then((muestra) => {
                        resolve(muestra);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                    break;
                case 'USER_ROLE':
                    vehiculo_1.default.find({ empresa: empresa })
                        .then((muestra) => {
                        resolve(muestra);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                    break;
                    return reject;
                    break;
            }
        });
    });
}
exports.muestreo = muestreo;
