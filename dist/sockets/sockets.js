"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const environment_1 = require("../global/environment");
function verificaToken(req, res, next) {
    const token = req.headers.authorization;
    jsonwebtoken_1.verify(token, environment_1.SEED, (err, decodificado) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto'
            });
        }
        if (decodificado.usuario.status !== 'activo') {
            return res.status(401).json({
                ok: false,
                mensaje: 'Su usuario se encuentra desactivado, contacte a un administrador'
            });
        }
        req.body.usuario = decodificado.usuario;
        next();
    });
}
exports.verificaToken = verificaToken;
function verificaWS(token, callback) {
    jsonwebtoken_1.verify(token, environment_1.SEED, (err, decodificado) => {
        if (err) {
            return callback({ ok: false, mensaje: 'Token incorrecto' });
        }
        if (decodificado.usuario.status !== 'activo') {
            return callback({ ok: false, mensaje: 'Usuario inactivo' });
        }
        callback({ ok: true, usuario: decodificado.usuario });
    });
}
exports.verificaWS = verificaWS;
