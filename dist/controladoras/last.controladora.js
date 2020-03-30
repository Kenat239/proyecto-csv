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
const last_1 = __importDefault(require("../modelos/last"));
const historial_1 = __importDefault(require("../modelos/historial"));
;
function HistorialAndLast({ protocolo, imei, latitud, longitud, altitud, valida, velocidad, curso, direccion, precision, alarma, status, status2, nivelbateria, distancia, distanciatotal, movimiento, gps }) {
    return __awaiter(this, void 0, void 0, function* () {
        return historial_1.default.create({
            protocolo,
            imei,
            latitud,
            longitud,
            altitud,
            valida,
            velocidad,
            curso,
            direccion,
            precision,
            alarma,
            status,
            status2,
            nivelbateria,
            distancia,
            distanciatotal,
            movimiento,
            gps
        })
            .then((data) => {
            console.log(data.gps);
            return last_1.default.findOne({ idGps: data.gps })
                .then((lastData) => {
                console.log(lastData);
                if (lastData === null) {
                    return last_1.default.create({
                        idGps: data.gps,
                        latitud,
                        longitud,
                        altitud,
                        velocidad,
                    }).then((dataLast) => {
                        return dataLast;
                    }).catch((error2) => {
                        return error2;
                    });
                }
                else {
                    console.log(data.gps);
                    return last_1.default.updateOne({ idGps: data.gps }, { latitud: data.latitud, longitud: data.longitud, altitud: data.altitud, velocidad: data.velocidad })
                        .then((datoGuardado) => {
                        return datoGuardado;
                    }).catch((error3) => {
                        return error3;
                    });
                }
            }).catch((error1) => {
                return error1;
            });
        })
            .catch((error) => {
            return error;
        });
    });
}
exports.HistorialAndLast = HistorialAndLast;
