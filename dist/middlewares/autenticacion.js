"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const environment_1 = require("../global/environment");
function verificaToken(req, res, next) {
    const token = req.headers.authorization;
    jsonwebtoken_1.verify(token, environment_1.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'token incorrectos'
            });
        }
        req.body.usuario = decoded.usuario;
        next();
    });
}
exports.default = verificaToken;
