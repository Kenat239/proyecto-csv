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
const csvShema = new mongoose_1.Schema({
    cabecera1: { type: String, required: [true, 'se necesita mas informacion'] },
    cabecera2: { type: String, required: [true, 'se necesita mas informacion'] },
    cabecera3: { type: String, required: [true, 'se necesita mas informacion'] }
}, { collection: 'Csv' });
exports.default = mongoose_1.default.model('Csv', csvShema);
