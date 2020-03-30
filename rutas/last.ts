import { Router, Request, Response } from 'express';
import * as last from '../controladoras/last.controladora';


const lastRoutes = Router();
//========================================================
// Guardar Ubicacion GPS
//========================================================
lastRoutes.post('/', async( req: Request, res: Response ) => {
    const body = req.body;

    await last.HistorialAndLast( {
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
            gps:body.gps
    }).then(( lastCreada: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Ubicación creada con exito',
            gps: lastCreada
        });
    }).catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    })
});



export default lastRoutes;