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
const vehiculoSchema = new mongoose_1.Schema({
    placas: { type: String, unique: true, required: [true, 'La placa es obligatoria'] },
    noSerie: { type: String, unique: true, required: [true, 'El numeor de serie debe ser unico'] },
    fechaAlta: { type: String, default: globales_1.fechaActual() },
    status: { type: String, default: 'ACTIVO' },
    gps: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gps' },
    empresa: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Empresa' }
}, { collection: 'vehiculos' });
vehiculoSchema.plugin(mongooseUniqueValidator, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.default.model('Vehiculo', vehiculoSchema);
