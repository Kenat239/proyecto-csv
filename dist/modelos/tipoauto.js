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
const TipoautoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre del vehiculo es obligatorio'] },
    marca: { type: String, required: [true, 'La marca del vehiculo es obligatorio'] },
    modelo: { type: Number, required: [true, 'El modelo del vehiculo es obligatorio'] },
    npuertas: { type: Number, required: [true, 'El numero de puertas es obligatorio'] },
    tipo: { type: String, required: [true, 'El tipo del vehiculo es obligatorio'] },
    status: { type: String, default: 'ACTIVO' },
}, { collection: 'tipoauto' });
TipoautoSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model('Tipoauto', TipoautoSchema);
