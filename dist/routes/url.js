"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_1 = require("../modelos/url");
const server_1 = __importDefault(require("../clases/server"));
const urlRoutes = express_1.Router();
const server = server_1.default.instance;
// ========================================
// ENLISTAR URLS REGISTRADAS
// ========================================
urlRoutes.get('/', (req, res) => {
    var desde = req.query.desde.limit || 0;
    desde: Number(desde);
    var limit = req.query.limit || 10;
    limit: Number(limit);
    url_1.Url.find({})
        .skip(desde)
        .limit(limit)
        .exec((error, url) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar lista de url`s',
                error
            });
        }
        url_1.Url.countDocuments((error, conteo) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al contar las Url`s',
                    error
                });
            }
            res.status(200).json({
                ok: true,
                url,
                conteo
            });
        });
    });
});
// ========================================
// AGREGAR URL A ANALIZAR 
// ========================================
urlRoutes.post('/', (req, res) => {
    const body = req.body;
    const fechaIngresoURL = new Date().toLocaleString();
    console.log(body);
    const url = new url_1.Url({
        url: body.url,
        ipExterna: body.ipExterna,
        rondaValidacion: body.rondaValidacion.toUpperCase(),
        responsablePlataforma: body.responsablePlataforma,
        fechaUltimaRevision: body.fechaUltimaRevision,
        avAltas: body.avAltas,
        avMedias: body.avMedias,
        avBajas: body.avBajas,
        ptAltas: body.ptAltas,
        ptMedias: body.ptMedias,
        ptBajas: body.ptBajas,
        nivelRiesgo: body.nivelRiesgo,
        avOpen: body.avOpen,
        ptOpen: body.ptOpen,
        avMitigadas: body.avMitigadas,
        ptMitigadas: body.ptMitigadas,
        rondaActual: body.rondaValidacion.toUpperCase(),
        avAltasMitigadas: body.avAltasMitigadas,
        avMediasMitigadas: body.avMediasMitigadas,
        avBajasMitigadas: body.avBajasMitigadas,
        ptAltasMitigadas: body.ptAltasMitigadas,
        ptMediasMitigadas: body.ptMediasMitigadas,
        ptBajasMitigadas: body.ptBajasMitigadas,
        fecha: fechaIngresoURL
    });
    console.log(url);
    url.save((error, urlGuardada) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar la url a analizar',
                error
            });
        }
        server.io.emit('url-nueva');
        res.status(200).json({
            ok: true,
            urlGuardada
        });
    });
});
// =======================================
// ACTUALIZAR URL
// ======================================
urlRoutes.put('/', (req, res) => {
    const body = req.body;
    const fechaActualizacion = new Date().toLocaleString();
    console.log(body);
    console.log(fechaActualizacion);
});
exports.default = urlRoutes;
