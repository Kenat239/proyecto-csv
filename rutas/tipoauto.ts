import { Router, Request, Response } from 'express';
import * as tipoauto from '../controladoras/tipoauto.controladora';


const tipoautoRoutes = Router();

//========================================================
// Crear Tipo de Vehiculo
//========================================================
tipoautoRoutes.post('/', async( req: Request, res: Response ) => {
    const body = req.body;

    await tipoauto.CrearTipoauto({
        nombre: body.nombre,
        marca: body.marca,
        modelo: body.modelo,
        tipo: body.tipo,
        npuertas: body.npuertas,
    }).then(( tipoautoCreado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Tipo de Auto creado',
            vehiculo: tipoautoCreado
        })
    }).catch(( error: Error ) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    }); 
});
//=======================================================
// Consultar todos los Tipos de Vehiculos Activos
//=======================================================
tipoautoRoutes.get('/', async( req: Request,res: Response ) => {
    await tipoauto.CargarTipoauto()
    .then( ( tipoauto: any ) => {
        return res.status(200).json({
            ok: true,
            tipoauto: tipoauto
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
tipoautoRoutes.get('/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;

    await tipoauto.BuscarTipoauto( id )
    .then( ( resultado: any ) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Auto Encontrado',
            tipoauto: resultado
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
tipoautoRoutes.put('/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;
    const stat = req.body.status;

    await tipoauto.DesactivarTipoauto( id, stat )
    .then( ( resultado: any ) => {
        return res.status(200).json({
            ok: true,
            manesaje: 'Vehiculo '+stat,
            tipoauto: resultado
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


export default tipoautoRoutes;