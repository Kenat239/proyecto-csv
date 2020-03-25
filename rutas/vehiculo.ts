import { Router, Request, Response } from 'express';
import * as vehiculo from '../controladoras/vehiculo.controladora';


const vehiculoRoutes = Router();

//========================================================
// Crear Vehiculo
//========================================================
vehiculoRoutes.post('/', async( req: Request, res: Response ) => {
    const body = req.body;

    await vehiculo.CrearVehiculo({
        placas: body.placas,
        noSerie: body.noSerie,
        empresa: body.empresa,
        gps: body.gps
        
    }).then(( vehiculoCreado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Vehiculo creado',
            vehiculo: vehiculoCreado
        })
    }).catch(( error: Error ) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    }); 
});
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
vehiculoRoutes.get('/', async( req: Request,res: Response ) => {
    await vehiculo.CargarVehiculos()
    .then( ( vehiculos: any ) => {
        return res.status(200).json({
            ok: true,
            vehiculos: vehiculos
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
// buscar Vehiculo especifico por id
//=======================================================
vehiculoRoutes.get('/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;

    await vehiculo.BuscarVehiculo( id )
    .then( ( resultado: any ) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Vehiculo Encontrado',
            vehiculo: resultado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el Vehiculo',
            error: error
        });

    });
});
//=======================================================
// Desactivar o Activar Vehiculo
//=======================================================
vehiculoRoutes.put('/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;
    const stat = req.body.status;

    await vehiculo.DesactivarVehiculo( id, stat )
    .then( ( resultado: any ) => {
        return res.status(200).json({
            ok: true,
            manesaje: 'Vehiculo '+stat,
            vehiculo: resultado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(400).json({
            ok: false,
            mensjae: 'Error al encontrar el id:'+ id +' del Vehiculo',
            error
        });
    });
});




export default vehiculoRoutes;