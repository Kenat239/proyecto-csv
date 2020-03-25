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
const empresa = __importStar(require("../controladoras/empres.controladora"));
const empresaRoutes = express_1.Router();
//========================================================
// Crear Empresa
//========================================================
empresaRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield empresa.CrearEmpresa({
        nombre: body.nombre,
        estado: body.estado,
        status: body.status
    }).then((empresaCreada) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Empresa creada',
            empresa: empresaCreada
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
}));
//=======================================================
// Consultar todas las Empresas Activas
//=======================================================
empresaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield empresa.CargarEmpresas()
        .then((empresas) => {
        return res.status(200).json({
            ok: true,
            empresas: empresas
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
// buscar Empresa especifica por id
//=======================================================
empresaRoutes.get('/buscar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield empresa.BuscarEmpresa(id)
        .then((resultado) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Empresa Encontrada',
            empresa: resultado
        });
    })
        .catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al bsucar la empresa',
            error: error
        });
    });
}));
//=======================================================
// Desactivar o Activar Empresa
//=======================================================
empresaRoutes.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const stat = req.body.status;
    yield empresa.DesactivarEmpresa(id, stat)
        .then((resultado) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Empresa ' + stat,
            empresa: resultado
        });
    })
        .catch((error) => {
        return res.status(400).json({
            ok: false,
            mensaje: ' Error al encontrar el id:' + id + 'de la Empresa',
            error
        });
    });
}));
exports.default = empresaRoutes;
