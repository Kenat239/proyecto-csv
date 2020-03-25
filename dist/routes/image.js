"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageRoutes = express_1.Router();
imageRoutes.get('/:tipo/:img', (req, res) => {
    const tipo = req.params.tipo;
    const img = req.params.img;
    // res.status(200).json({
    //     tipo: tipo,
    //     img: img
    // });
    const pathImagen = path_1.default.resolve(__dirname, `../../dist/uploads/${tipo}/${img}`);
    if (fs_1.default.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        var pathNoImagen = path_1.default.resolve(__dirname, `../assets/no-img.jpg`);
        res.sendFile(pathNoImagen);
    }
});
exports.default = imageRoutes;
