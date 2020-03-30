import { Router,Request,Response }  from 'express';
import * as estados from '../controladoras/estado.controladora';


const estadoRoutes = Router();

//========================================================
// Crear Empresa
//========================================================

estadoRoutes.post ('/', async(req:Request, res: Response) => {
    const body = req.body;

    await estados.crearEstado ( {
        N_Estado: body.N_Estado,
        capital: body.capital,
        municipio: body.municipio,
        codigopostal: body.codigopostal,
        status: body.status
    })

    .then(( estadocreado:any) => {
        return res.status(200).json ({
            ok:true,
            mensaje: 'estado registrado con exito',
            estado: estadocreado
        });
    })

    .catch ((error:Error) => {
        throw res.status(400).json({
            ok: false,
            mensaje: 'error al registrar el estado',
            error: error
        });
    });


});


//=======================================================
// Consultar todos los Estados
//=======================================================

estadoRoutes.get ('/', async(req:Request, res:Response) => {
    await estados.cargarEstado()

    .then ((estado:any) => {
        return res.status(200).json({
            ok:true,
            estaods:estado
        });
    })

    .catch ((error:Error) => {
        throw res.status(500).json({
            ok:false,
            mensaje:'error en la base de datos',
            error:error
        });
    });
});


//=======================================================
// Consultar todos los Estados activos
//=======================================================

estadoRoutes.get('/activos', async(req:Request, res:Response) => {
    
    await estados.ActivEmpresa()
    
    
    .then((resultado:any) => {
        return res.status(200).json({
            ok:true,
            empresa:resultado
        });
    })

    .catch((error:Error) => {
        res.status(500).json({
            ok:false,
            eror:error
            
        });
    });
});


//=======================================================
// buscar Estado especifico por id
//=======================================================

estadoRoutes.get ('/buscar/:id', async(req:Request, res:Response) => {
    const id = req.params.id;

    await estados.buscarEstado(id)

    .then((estadoEnc:any) => {
        res.status(200).json({
            ok:true,
            mensaje: 'estado encontrado',
            estado:estadoEnc
        });
    })

    .catch((error:Error) => {
        throw res.status(500).json({
            ok:false,
            mensaje: 'error en la base de datos',
            error:error
        });
    });
});

//=======================================================
// Desactivar o Activar Estado
//=======================================================


estadoRoutes.put('/:id', async(req:Request, res:Response) => {
    const id =req.params.id;
    const stat = req.body.status;

    await estados.desactivaEstado(id, stat) 
    
    .then((desEstado:any) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'estado actualizado con exito',
            estado:desEstado
        });
    })

    .catch((error:Error) => {
        throw res.status(400).json({
            ok:false,
            mensaje: 'error al actualizar el estado',
            error:error
        });
    });
});


export default estadoRoutes;