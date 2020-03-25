import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SEED } from '../global/environment';

export function verificaToken ( req: Request, res: Response, next: NextFunction ) {
    const token: any = req.headers.authorization;

    verify( token, SEED, ( err: any, decodificado: any) => {
        if ( err ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto'
            });
        }

        if ( decodificado.usuario.status !== 'activo' ) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Su usuario se encuentra desactivado, contacte a un administrador'
            });
        }

        req.body.usuario = decodificado.usuario;

        next();
    });
}

export function verificaWS ( token: string, callback: Function ) {
    verify( token, SEED, ( err: any, decodificado: any ) => {
        if ( err ) {
            return callback( { ok: false, mensaje: 'Token incorrecto'} );
        }

        if ( decodificado.usuario.status !== 'activo' ) {
            return callback( { ok: false, mensaje: 'Usuario inactivo'} );
        }

        callback( { ok: true, usuario: decodificado.usuario } );
    });
}