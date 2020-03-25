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
const vehiculo = __importStar(require("../controladoras/vehiculo.controladora"));
const vehiculoRoutes = express_1.Router();
//========================================================
// Crear Vehiculo
//========================================================
vehiculoRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield vehiculo.CrearVehiculo({
        placas: body.placas,
        noSerie: body.noSerie,
        empresa: body.empresa,
        gps: body.gps
    }).then((vehiculoCreado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Vehiculo creado',
            vehiculo: vehiculoCreado
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
}));
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
vehiculoRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield vehiculo.CargarVehiculos()
        .then((vehiculos) => {
        return res.status(200).json({
            ok: true,
            vehiculos: vehiculos
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
vehiculoRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield vehiculo.BuscarVehiculo(id)
        .then((resultado) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Vehiculo Encontrado',
            vehiculo: resultado
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
vehiculoRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const stat = req.body.status;
    yield vehiculo.DesactivarVehiculo(id, stat)
        .then((resultado) => {
        return res.status(200).json({
            ok: true,
            manesaje: 'Vehiculo ' + stat,
            vehiculo: resultado
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
exports.default = vehiculoRoutes;
