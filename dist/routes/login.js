"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../modelos/usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enviroment_1 = require("../global/enviroment");
const loginRoutes = express_1.Router();
//================================================
// Login
//================================================
loginRoutes.post('/', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al tratar de ingresar',
                err: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - email',
                err: err
            });
        }
        if (usuarioDB.status === 'INACTIVO') {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario esta inactivo, contacte a un administrador'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                err: err
            });
        }
        usuarioDB.lingreso = new Date().toLocaleString();
        usuarioDB.save((err, usuarioDBA) => {
            if (err) {
                console.log('error en la actualizacion de ultima conexion');
            }
            const token = jsonwebtoken_1.default.sign({ usuario: usuarioDBA }, enviroment_1.SEED, { expiresIn: 14400 });
            usuarioDBA.password = 'XD';
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            });
        });
    });
});
function obtenerMenu(ROLE) {
    var menu = [{
            titulo: 'Principal',
            icono: 'zmdi zmdi-dns zmdi-hc-fw',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                // { titulo: 'Configuraciones', url: '/configuraciones' },
                { titulo: 'URL`s', url: '/url' },
                { titulo: 'Usuarios', url: '/usuario' }
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'zmdi zmdi-wrench zmdi-hc-fw',
            submenu: [
                // { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Comandantes', url: '/comandantes' },
                { titulo: 'Bases de operaciones', url: '/bo' }
            ]
        }
    ];
    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.push({ titulo: 'Usuarios', url: '/usuarios' });
    }
    return menu;
}
exports.default = loginRoutes;
