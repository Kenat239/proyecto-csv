"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const historialSchema = new mongoose_1.Schema({
    idGps: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Gps' },
    protocolo: { type: String, required: [true, 'La serie de GPS es obligatorio'] },
    imei: { type: String, unique: true, required: [true, 'El IMEI del GPS es obligatorio'] },
    latitud: { type: Number, required: [true, 'La latitud es requerida'] },
    longitud: { type: Number, required: [true, 'La longitud es requerida'] },
    altitud: { type: Number, required: [true, 'La altitud es requerida'] },
    valida: { type: String, required: [true, 'La válida es requerida'] },
    velocidad: { type: String, required: [true, 'la velocidad es requerida'] },
    curso: { type: String, required: [true, 'El curso es requerido'] },
    direccion: { type: String, required: [true, 'La dirección es requerida'] },
    precision: { type: Number, required: [true, 'La precisión es requerida'] },
    alarma: { type: String, required: false },
    status: { type: String, default: 'ACTIVO' },
    status2: { type: String, default: 'DISPONIBLE' },
    nivelbateria: { type: Number, required: [true, 'El nivel de la bateria es requerido'] },
    distancia: { type: Number, required: [true, 'La distancia es requerida'] },
    distanciatotal: { type: Number, required: [true, 'La distancia total es requerida'] },
    movimiento: { type: String, required: [true, 'el movimiento es requerido'] },
}, { collection: 'Historial' });
historialSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.default.model('Historial', historialSchema);
