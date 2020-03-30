import Estado, {IEstado} from '../modelos/estados';
import { resolve } from 'path';
import estados from '../modelos/estados';

interface ICrearEstado {
    N_Estado:string,
    capital:string,
    municipio:string,
    codigopostal:number,
    status:string
}


//=======================================================
// Crear Estado
//=======================================================

async function crearEstado ({
    N_Estado,
    capital,
    municipio,
    codigopostal,
    status
}: ICrearEstado): Promise <IEstado> {


    return Estado.create({
        N_Estado,
        capital,
        municipio,
        codigopostal,
        status
    })


    .then ((datos: IEstado) => {
        return datos
    })


    .catch((err:Error) => {
        throw err
    })
}

//=======================================================
// Consultar todos los Estados
//=======================================================

async function cargarEstado (): Promise <IEstado> {
    return Estado.find()


    .then ((estados:any) => {
        return estados
    })


    .catch((err:Error) => {
        throw err
    })
}

//=======================================================
// buscar Estado especifico por id
//=======================================================

async function buscarEstado (id: any) {
    return new Promise ( (resolve, reject) => {
        Estado.findById ( {_id: id}, 'N_Estado municipio codigopostal status')

        
        .then ((resultado: any ) => {
            resolve (resultado)
        })


        .catch ((err:Error) => {
            reject (err)
        })
    })
}

//=======================================================
// Consultar todos los Estados activos
//=======================================================

async function ActivEmpresa (): Promise <IEstado> {
    return estados.find({status: 'ACTIVO'})

    .then((estado:any) => {
        return estado
    })

    .catch((error:Error) => {
        throw (error)
    })
}

//=======================================================
// Desactivar o Activar Estado
//=======================================================

async function desactivaEstado(id:string, stat:string) {
    return new Promise ((resolve, reject ) => {
        Estado.updateOne({_id:id}, {$set: {status: stat} } )
        
        .then ((estadoD: any) => {
            resolve (estadoD)
        })

        .catch((error:Error) => {
            reject(error)
        });
    });
}

export {
    crearEstado,
    cargarEstado,
    buscarEstado,
    ActivEmpresa,
    desactivaEstado
}