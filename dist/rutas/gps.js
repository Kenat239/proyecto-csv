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
const gps = __importStar(require("../controladoras/gps.controladora"));
const gpsRoutes = express_1.Router();
//========================================================
// Crear GPS
//========================================================
gpsRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield gps.CrearGps({
        serie: body.serie,
        imei: body.imei,
        latitud: body.latitud,
        longitud: body.longitud,
        velocidad: body.velocidad,
        alarma: body.alarma
    }).then((gpsCreado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Gps Creado con exito',
            gps: gpsCreado
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
}));
//=======================================================
// Consultar todos los GPS's Activos
//=======================================================
gpsRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield gps.CargarGpss()
        .then((gpss) => {
        return res.status(200).json({
            ok: true,
            gpss: gpss
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
// Consultar todos los GPS's Disponibles
//=======================================================
gpsRoutes.get('/disponible', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield gps.DispGpss()
        .then((gpsD) => {
        return res.status(200).json({
            ok: true,
            gpsD: gpsD
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
// buscar Gps especifico por id
//=======================================================
gpsRoutes.get('/buscar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield gps.BuscarGps(id)
        .then((resultado) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Gps encontrado',
            gps: resultado
        });
    })
        .catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el Gps',
            error: error
        });
    });
}));
//=======================================================
// Desactivar o Activar GPS
//=======================================================
gpsRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const stat = req.body.status;
    yield gps.DesactivarGps(id, stat)
        .then((resultado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'GPS ' + stat,
            gps: resultado
        });
    })
        .catch((error) => {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al encontrar el id' + id + ' del GPS',
            error
        });
    });
}));
exports.default = gpsRoutes;
