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
const tipoauto = __importStar(require("../controladoras/tipoauto.controladora"));
const tipoautoRoutes = express_1.Router();
//========================================================
// Crear Tipo de Vehiculo
//========================================================
tipoautoRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield tipoauto.CrearTipoauto({
        nombre: body.nombre,
        marca: body.marca,
        modelo: body.modelo,
        tipo: body.tipo,
        npuertas: body.npuertas,
    }).then((tipoautoCreado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Tipo de Auto creado',
            vehiculo: tipoautoCreado
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
}));
//=======================================================
// Consultar todos los Tipos de Vehiculos Activos
//=======================================================
tipoautoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield tipoauto.CargarTipoauto()
        .then((tipoauto) => {
        return res.status(200).json({
            ok: true,
            tipoauto: tipoauto
        });
    })
        .catch((error) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
}));
//=======================================================
// buscar Vehiculo especifico por id
//=======================================================
tipoautoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield tipoauto.BuscarTipoauto(id)
        .then((resultado) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Auto Encontrado',
            tipoauto: resultado
        });
    })
        .catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el Vehiculo',
            error: error
        });
    });
}));
//=======================================================
// Desactivar o Activar Vehiculo
//=======================================================
tipoautoRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const stat = req.body.status;
    yield tipoauto.DesactivarTipoauto(id, stat)
        .then((resultado) => {
        return res.status(200).json({
            ok: true,
            manesaje: 'Vehiculo ' + stat,
            tipoauto: resultado
        });
    })
        .catch((error) => {
        return res.status(400).json({
            ok: false,
            mensjae: 'Error al encontrar el id:' + id + ' del Vehiculo',
            error
        });
    });
}));
exports.default = tipoautoRoutes;
