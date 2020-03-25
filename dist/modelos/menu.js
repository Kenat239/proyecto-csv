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
const menuSchema = new mongoose_1.Schema({
    role: { type: String, required: [true, 'El role para menu es necesario'] },
    titulo: { type: String, required: [true, 'El titulo de menu es necesario'] },
    icono: { type: String, required: [true, 'El icono del menu es necesario'] },
    submenu: { type: Array, default: [] }
}, { collection: 'menus' });
exports.default = mongoose_1.default.model('Menu', menuSchema);
