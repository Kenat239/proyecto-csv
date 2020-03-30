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
const last = __importStar(require("../controladoras/last.controladora"));
const lastRoutes = express_1.Router();
//========================================================
// Guardar Ubicacion GPS
//========================================================
lastRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    yield last.HistorialAndLast({
        protocolo: body.protocolo,
        imei: body.imei,
        latitud: body.latitud,
        longitud: body.longitud,
        altitud: body.altitud,
        valida: body.valida,
        velocidad: body.velocidad,
        curso: body.curso,
        direccion: body.direccion,
        precision: body.precision,
        alarma: body.alarma,
        status: body.status,
        status2: body.status2,
        nivelbateria: body.nivelbateria,
        distancia: body.distancia,
        distanciatotal: body.distanciatotal,
        movimiento: body.movimiento,
        gps: body.gps
    }).then((lastCreada) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Ubicación creada con exito',
            gps: lastCreada
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
}));
//========================================================
// consulta Last
//========================================================
/*lastRoutes.post('/last', async(req:Request, res:Response) => {
    const id = req.params.historial.id
    
    await last.lastUbication (id)
    .then( ( datos:any ) => {
        res.status(200).json({
            ok:true,
            mensaje: 'estos son los datos',
            data:datos
        })
    })
    .catch( ( err:Error ) => {
        res.status(400).json({
            ok:false,
            error:err
        })
    })
})*/
exports.default = lastRoutes;
