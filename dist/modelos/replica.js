"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
exports.replicaSchema = new mongoose_1.Schema({
    modavAltas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modavMedias: { type: Number, required: [true, "Este campo es obligatorio"] },
    modavBajas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptAltas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptMedias: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptBajas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modnivelRiesgo: { type: String, required: [true, "Este campo es obligatorio"] },
    modavOpen: { type: String, required: [true, "Este campo es obligatorio"] },
    modptOpen: { type: String, required: [true, "Este campo es obligatorio"] },
    modavAltasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modavMediasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modavBajasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptAltasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptMediasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modptBajasMitigadas: { type: Number, required: [true, "Este campo es obligatorio"] },
    modrondaActual: { type: String, required: [true, "Este campo es obligatorio"] },
    idurl: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Url' }
}, { collection: 'replicas' });
exports.replicaSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unica' });
exports.Replica = mongoose_1.model('Replica', exports.replicaSchema);
