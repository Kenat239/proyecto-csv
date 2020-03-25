import { Router, Request, Response } from 'express';
import * as gps from '../controladoras/gps.controladora';
import { SEED } from '../global/environment';

const gpsRoutes = Router();

//========================================================
// Crear GPS
//========================================================
gpsRoutes.post('/', async( req: Request, res: Response ) => {
    const body = req.body;

    await gps.CrearGps( {
        serie: body.serie,
        imei: body.imei,
        latitud: body.latitud,
        longitud: body.longitud,
        velocidad: body.velocidad,
        alarma: body.alarma
    }).then(( gpsCreado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Gps Creado con exito',
            gps: gpsCreado
        });
    }).catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
});

//=======================================================
// Consultar todos los GPS's Activos
//=======================================================
gpsRoutes.get('/', async(req: Request, res: Response ) => {
    await gps.CargarGpss()
    .then( (gpss: any ) => {
        return res.status(200).json({
            ok: true,
            gpss: gpss
        });
    })
    .catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
});

//=======================================================
// Consultar todos los GPS's Disponibles
//=======================================================

gpsRoutes.get ('/disponible', async(req: Request, res: Response) => {
    await gps.DispGpss ()
    .then ( (gpsD:any) => {
        return res.status(200).json({
            ok: true,
            gpsD:gpsD
        });
    })
    .catch ( (error: Error) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    })
});

//=======================================================
// buscar Gps especifico por id
//=======================================================
gpsRoutes.get('/buscar/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;

    await gps.BuscarGps( id )
    .then(( resultado: any ) => { 
        res.status(200).json({
            ok: true,
            mensaje: 'Gps encontrado',
            gps: resultado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el Gps',
            error: error
        });
    });
});
//=======================================================
// Desactivar o Activar GPS
//=======================================================
gpsRoutes.put('/:id', async( req: Request, res: Response ) => {
    const id= req.params.id;
    const stat = req.body.status;

    await gps.DesactivarGps( id, stat )
    .then( ( resultado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje:'GPS '+stat,
            gps: resultado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al encontrar el id' + id + ' del GPS',
            error
        });
    });
});

export default gpsRoutes;