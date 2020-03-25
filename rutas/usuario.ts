import { Router, Request, Response } from 'express';
import * as usuario from '../controladoras/usuario.controladora';
import { MenuRole } from '../controladoras/menu.controladora';
import bcrypt from 'bcrypt';
import { IUsuario } from '../modelos/usuario';
import jwd from 'jsonwebtoken';
import { SEED } from '../global/environment';


const usuarioRoutes = Router();

//===================================================================
// Crear usuario
//===================================================================
usuarioRoutes.post('/', async ( req: Request, res: Response ) => {
    const body = req.body;
console.log(body);
    await usuario.CrearUsuario( {
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        empresa: body.empresa
    }).then((usuarioCreado: any) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Usuario creado con exito',
            usuario: usuarioCreado
        });
    }).catch((error: Error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
});


//===================================================================
// Ver usuarios
//===================================================================
usuarioRoutes.get('/',async( req: Request, res: Response) => {
    await usuario.CargarUsuarios()
    .then( ( usuarios: any ) => {
        return res.status(200).json({
            ok: true,
            usuarios
        })
    }).catch( ( error: Error ) => {
        return res.status(500).json({
            ok: false,
            error
        })
    })
});

//===================================================================
// Actualizar usuario
//===================================================================
usuarioRoutes.put('/:id',async( req: Request, res: Response ) => {
    const id = req.params.id;
    const body = req.body;

    await usuario.ActualizaUsuario( id, body )
    .then( ( usuarioActualizado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Usuario actualizado',
            usuario: usuarioActualizado
        });
    })
    .catch( ( error: Error ) => {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar usuario',
            error: error
        });
    });
});

//===================================================================
// DESACTIVAR O ACTIVAR Usuario
//===================================================================
usuarioRoutes.put('/:status/:id', async( req: Request, res: Response ) => {
    const id = req.params.id;
    const stat = req.params.status;

    await usuario.DesactivarUsuario(id, stat )
    .then( ( resultado: any ) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'Usuario '+ stat,
            usuario: resultado
        });
    })
    .catch( ( error: Error) => {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al encontrar al usuario',
            error
        });
    });
});
//===================================================================
// Login usuario
//===================================================================
usuarioRoutes.post('/login', async( req: Request, res: Response ) => {
    const body = req.body;

    await usuario.LoginUsuario({
        email: body.email
    })
    .then((UsuarioDB: IUsuario) => {
        if ( !UsuarioDB ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'El usuario no existe'
            });
        }

        if ( UsuarioDB.status !== 'activo' ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Usuario desactivado, contacte a su administrador'
            });
        }

        if ( !bcrypt.compareSync(body.password, UsuarioDB.password) ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'La contraseña ingresada es incorrecta'
            });
        }

        const token = jwd.sign( { usuario: UsuarioDB }, SEED, { expiresIn: 3600 } );

        UsuarioDB.password = 'null';

        MenuRole( UsuarioDB.role )
        .then( ( menu: any) => {
            return res.status(200).json({
                ok: true,
                mensaje: 'Usuario logueado con exito',
                id: UsuarioDB._id,
                token: token,
                usuario: UsuarioDB,
                menu: menu
            });   
        });
    })
    .catch((error: Error) => {
        return res.status(500).json({
            ok: false,
            mensaje: error
        });
    });
})




export default usuarioRoutes;