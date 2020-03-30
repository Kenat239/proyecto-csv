import { Router, Request, Response } from 'express';
import * as last from '../controladoras/gps.controladora';


const lastRoutes = Router();
//========================================================
// Guardar Ubicacion GPS
//========================================================
lastRoutes.post('/', async( req: Request, res: Response ) => {
    const body = req.body;

    await last.lastUbication( {
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

//========================================================
// consulta Last
//========================================================
lastRoutes.get('/last/:id', async(req:Request, res:Response) => {
    const id = req.params.historial.id
    
    await last.datoslast (id)
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
})

export default lastRoutes;