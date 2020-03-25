"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const sockets_1 = require("../sockets/sockets");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        de,
        cuerpo,
        id
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        de,
        cuerpo,
        id
    });
});
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            res.json();
        }
    });
});
router.get('/usuarios/detalle', (req, res) => {
    sockets_1.usuariosConectados;
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
router.get('/prueba', (req, res) => {
    const headers = req.headers.authorization;
    res.json({
        headers: headers
    });
});
router.post('/suma', (req, res) => {
    const body = req.body;
    var suma = Number(body.uno) + Number(body.dos);
    const letr = body.letras;
    console.log(suma);
    res.status(200).json({
        ok: true,
        suma,
        letr
    });
});
exports.default = router;
