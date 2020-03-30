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
const gpsSchema = new mongoose_1.Schema({
    serie: { type: String, unique: true, required: [true, 'La serie de GPS es obligatorio'] },
    imei: { type: String, required: [true, 'El IMEI del GPS es obligatorio'] },
    latitud: { type: Number, required: [true, 'La latitud es requerida'] },
    longitud: { type: Number, required: [true, 'La longitud es requerida'] },
    velocidad: { type: String, required: [true, 'la velocidad es requerida'] },
    alarma: { type: String, required: false },
    status: { type: String, default: 'ACTIVO' },
    status2: { type: String, default: 'DISPONIBLE' }
}, { collection: 'Gps' });
gpsSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.default.model('Gps', gpsSchema);
