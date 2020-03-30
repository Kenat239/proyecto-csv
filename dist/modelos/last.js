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
const lastShema = new mongoose_1.Schema({
    idGps: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gps' },
    latidud: { type: Number, required: [false, 'se necesita la latitud'] },
    longitud: { type: Number, required: [true, 'se necesita la longitud'] },
    altitud: { type: Number, required: [true, 'se necesita la altitud'] },
    velocidad: { type: String, required: [true, 'se necesita la velocidad'] },
    fechaRegistro: { type: String, default: globales_1.fechaActual() },
    horaRegistro: { type: String, default: globales_1.horaActual() },
}, { collection: 'Last' });
exports.default = mongoose_1.default.model('Last', lastShema);
