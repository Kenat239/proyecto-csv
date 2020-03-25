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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estados = __importStar(require("../controladoras/estado.controladora"));
const estadoRoutes = express_1.Router();
//========================================================
// Crear Empresa
//========================================================
estadoRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield estados.crearEstado({
        N_Estado: body.N_Estado,
        capital: body.capital,
        municipio: body.municipio,
        codigopostal: body.codigopostal,
        status: body.status
    })
        .then((estadocreado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'estado registrado con exito',
            estado: estadocreado
        });
    })
        .catch((error) => {
        throw res.status(400).json({
            ok: false,
            mensaje: 'error al registrar el estado',
            error: error
        });
    });
}));
//=======================================================
// Consultar todos los Estados
//=======================================================
estadoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield estados.cargarEstado()
        .then((estado) => {
        return res.status(200).json({
            ok: true,
            estaods: estado
        });
    })
        .catch((error) => {
        throw res.status(500).json({
            ok: false,
            mensaje: 'error en la base de datos',
            error: error
        });
    });
}));
//=======================================================
// buscar Estado especifico por id
//=======================================================
estadoRoutes.get('/buscar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield estados.buscarEstado(id)
        .then((estadoEnc) => {
        res.status(200).json({
            ok: true,
            mensaje: 'estado encontrado',
            estado: estadoEnc
        });
    })
        .catch((error) => {
        throw res.status(500).json({
            ok: false,
            mensaje: 'error en la base de datos',
            error: error
        });
    });
}));
//=======================================================
// Desactivar o Activar Estado
//=======================================================
estadoRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const stat = req.body.status;
    yield estados.desactivaEstado(id, stat)
        .then((desEstado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'estado actualizado con exito',
            estado: desEstado
        });
    })
        .catch((error) => {
        throw res.status(400).json({
            ok: false,
            mensaje: 'error al actualizar el estado',
            error: error
        });
    });
}));
exports.default = estadoRoutes;
