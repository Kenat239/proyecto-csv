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
const EmpresaSchema = new mongoose_1.Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre de la empresa es obligatorio'] },
    estado: { type: String, required: [true, 'El estado de la empresa es obligatorio'] },
    status: { type: String, default: 'ACTIVO' }
}, { collection: 'empresa' });
EmpresaSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.default = mongoose_1.default.model('Empresa', EmpresaSchema);
