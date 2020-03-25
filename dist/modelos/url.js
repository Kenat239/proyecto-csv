"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
exports.urlSchema = new mongoose_1.Schema({
    url: { type: String, unique: true, required: [true, 'La url o ip es requerida'] },
    ipExterna: { type: String, required: [true, 'La ip Externa es requerida'] },
    rondaValidacion: { type: String, required: [true, 'La ronda de validacion es requerida'] },
    responsablePlataforma: { type: String, required: [true, 'El responsable de la plataforma es requerida'] },
    fechaUltimaRevision: { type: Date, required: [true, 'la fecha de revision es requerida'] },
    avAltas: { type: Number, required: false },
    avMedias: { type: Number, required: false },
    avBajas: { type: Number, required: false },
    ptAltas: { type: Number, required: false },
    ptMedias: { type: Number, required: false },
    ptBajas: { type: Number, required: false },
    nivelRiesgo: { type: String, required: false },
    avOpen: { type: String, required: false },
    ptOpen: { type: String, required: false },
    rondaActual: { type: String, required: false },
    avAltasMitigadas: { type: Number, required: false },
    avMediasMitigadas: { type: Number, required: false },
    avBajasMitigadas: { type: Number, required: false },
    ptAltasMitigadas: { type: Number, required: false },
    ptMediasMitigadas: { type: Number, required: false },
    ptBajasMitigadas: { type: Number, required: false },
    fecha: { type: String, required: true }
}, { collection: 'Url' });
exports.urlSchema.plugin(mongoose_unique_validator_1.default, { message: 'El {PATH} debe ser unico' });
exports.Url = mongoose_1.model("Url", exports.urlSchema);
