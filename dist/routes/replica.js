"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const replica_1 = require("../modelos/replica");
const url_1 = require("../modelos/url");
const replicaRoutes = express_1.Router();
// ==================================================
// Enlista todas las replicas de todas las URl's
// ==================================================
replicaRoutes.get('/', (req, res) => {
    replica_1.Replica.find({}, (error, urlDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al encontrar las url`s',
                error
            });
        }
        res.status(200).json({
            ok: true,
            urlDB
        });
    });
});
// ====================================================
// Enlistar replica por id
// ====================================================
replicaRoutes.get('/:id', (req, res) => {
    const id = req.params.id;
    replica_1.Replica.find({ idurl: id }, (error, replicaAConsultar) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al consultar la replica',
                error
            });
        }
        res.status(200).json({
            ok: true,
            replicaAConsultar
        });
    });
});
// ======================================
//  REGISTRAR RONDAS DE VALIDACIÒN
// ======================================
replicaRoutes.post('/:id', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const replica = new replica_1.Replica({
        modavAltas: body.modavAltas,
        modavMedias: body.modavMedias,
        modavBajas: body.modavBajas,
        modptAltas: body.modptAltas,
        modptMedias: body.modptMedias,
        modptBajas: body.modptBajas,
        modnivelRiesgo: body.modnivelRiesgo,
        modavOpen: body.modavOpen,
        modptOpen: body.modptOpen,
        modavAltasMitigadas: body.modavAltasMitigadas,
        modavMediasMitigadas: body.modavMediasMitigadas,
        modavBajasMitigadas: body.modavBajasMitigadas,
        modptAltasMitigadas: body.modptAltasMitigadas,
        modptMediasMitigadas: body.modptMediasMitigadas,
        modptBajasMitigadas: body.modptBajasMitigadas,
        modrondaActual: body.modrondaActual,
        idurl: id
    });
    url_1.Url.findById(id, (error, urlDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al consultar la Url',
                error
            });
        }
        replica.save((error, replicaGuardada) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensjae: " Error al guardar replica de url",
                    error
                });
            }
            url_1.Url.updateOne({ _id: id }, { $set: { rondaActual: body.modrondaActual } }, (error, urlUpdate) => {
                if (error) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: ' Error al actualizar la ronda',
                        error
                    });
                }
                res.status(200).json({
                    ok: true,
                    replicaGuardada,
                    urlUpdate
                });
            });
            //en este modulo se tiene que actualizar la ronda de la url que se esta analzando de nuevo en el json de BD URL 
        });
    });
});
exports.default = replicaRoutes;
