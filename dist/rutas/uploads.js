"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = express_1.Router();
app.use(express_fileupload_1.default());
// =====================================================
//   Subida de archivos                   
// =====================================================
app.put('/', (req, res) => {
    if (!req.files) {
        res.status(400).json({
            ok: false,
            mensaje: 'no seleccionó el archivo'
        });
        return;
    }
    const archivo = req.files.archivo;
    archivo.mv('./uploads/Csvs/filename.csv', (err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error al subir',
                err: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Archivo subido correctamente',
            archivo: archivo
        });
    });
});
exports.default = app;
