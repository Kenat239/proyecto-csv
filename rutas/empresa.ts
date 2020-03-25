import { Router, Request, Response } from 'express';
import * as empresa from '../controladoras/empres.controladora';
import { SEED } from '../global/environment';

const empresaRoutes = Router();

//========================================================
// Crear Empresa
//========================================================
empresaRoutes.post('/',async( req: Request, res: Response ) => {
    const body = req.body;

    await empresa.CrearEmpresa({
        nombre: body.nombre,
        estado: body.estado,
        status: body.status
    }).then( ( empresaCreada: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Empresa creada',
            empresa: empresaCreada
        });
    }).catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            error: error
        });
    });
});

//=======================================================
// Consultar todas las Empresas Activas
//=======================================================
empresaRoutes.get('/',async( req: Request, res: Response ) => {
    await empresa.CargarEmpresas()
    .then( ( empresas: any ) => {
        return res.status(200).json({
            ok: true,
            empresas: empresas
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
// buscar Empresa especifica por id
//=======================================================
empresaRoutes.get('/buscar/:id', async( req: Request, res: Response ) => {
    const id= req.params.id;

    await empresa.BuscarEmpresa( id )
    .then( ( resultado: any ) => {
        res.status(200).json({
            ok: true,
            mensaje: 'Empresa Encontrada',
            empresa: resultado
        });
    })
    .catch( ( error: Error) => {
        return res.status(500).json({
            ok: false, 
            mensaje: 'Error al bsucar la empresa',
            error: error
        });
    });
});

//=======================================================
// Desactivar o Activar Empresa
//=======================================================
empresaRoutes.put('/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;
    const stat = req.body.status;

    await empresa.DesactivarEmpresa( id, stat )
    .then( ( resultado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Empresa '+stat,
            empresa: resultado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(400).json({
            ok: false,
            mensaje: ' Error al encontrar el id:'+id+'de la Empresa',
            error
        });
    });
});


export default empresaRoutes;