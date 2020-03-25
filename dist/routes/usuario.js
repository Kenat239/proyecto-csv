"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario = __importStar(require("../controladoras/usuario.controladora"));
const menu_controladora_1 = require("../controladoras/menu.controladora");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../global/environment");
const usuarioRoutes = express_1.Router();
//===================================================================
// Crear usuario
//===================================================================
usuarioRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    yield usuario.CrearUsuario({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        email: body.email,
        password: bcrypt_1.default.hashSync(body.password, 10)
    }).then((usuarioCreado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado con exito',
            usuario: usuarioCreado
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
}));
//===================================================================
// Ver usuarios
//===================================================================
usuarioRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield usuario.CargarUsuarios()
        .then((usuarios) => {
        return res.status(200).json({
            ok: true,
            usuarios
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            error
        });
    });
}));
//===================================================================
// Actualizar usuario
//===================================================================
//===================================================================
// Eliminar usuario
//===================================================================
//===================================================================
// Login usuario
//===================================================================
usuarioRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield usuario.LoginUsuario({
        email: body.email
    })
        .then((UsuarioDB) => {
        if (!UsuarioDB) {
            return res.status(401).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }
        if (UsuarioDB.status !== 'activo') {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario desactivado, contacte a su administrador'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, UsuarioDB.password)) {
            return res.status(401).json({
                ok: false,
                mensaje: 'La contraseña ingresada es incorrecta'
            });
        }
        const token = jsonwebtoken_1.default.sign({ usuario: UsuarioDB }, environment_1.SEED, { expiresIn: 3600 });
        UsuarioDB.password = 'null';
        menu_controladora_1.MenuRole(UsuarioDB.role)
            .then((menu) => {
            return res.status(200).json({
                ok: true,
                mensaje: 'Usuario logueado con exito',
                id: UsuarioDB._id,
                token: token,
                usuario: UsuarioDB,
                menu: menu
            });
        });
    })
        .catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
}));
exports.default = usuarioRoutes;
