import Tipoauto, { ITipoauto } from '../modelos/tipoauto';

interface ICrearTipoauto {
    nombre: ITipoauto['nombre'];
    marca: ITipoauto['marca'];
    modelo: ITipoauto['modelo'];
    tipo: ITipoauto['tipo'];
    npuertas: ITipoauto['npuertas'];
}

//=======================================================
// Crear vehiculo
//=======================================================
async function CrearTipoauto({
    nombre,
    marca,
    modelo,
    tipo,
    npuertas,
}: ICrearTipoauto): Promise<ITipoauto>{
    return Tipoauto.create({
        nombre,
        marca,
        modelo,
        tipo,
        npuertas
    })
    .then( ( datos: ITipoauto ) => {
        return datos;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
async function CargarTipoauto():Promise<ITipoauto> {
    return Tipoauto.find({ status: 'ACTIVO'})
    .then( ( vehiculos: any ) => {
        return vehiculos;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}
//=======================================================
// buscar Vehiculo especifico por id
//=======================================================

async function BuscarTipoauto( id: any ){

    return new Promise( ( resolve, reject) => {
        Tipoauto.findById({ _id: id }, 'nombre marca modelo tipo status')
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}

//=======================================================
// Desactivar o Activar Vehiculo
//=======================================================
async function DesactivarTipoauto( id: string, stat: string ){
    return new Promise( ( resolve, reject ) => {
        Tipoauto.updateOne( { _id: id }, { $set: { status: stat } } )
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}


export {
    BuscarTipoauto,
    CrearTipoauto,
    CargarTipoauto,
    DesactivarTipoauto
}