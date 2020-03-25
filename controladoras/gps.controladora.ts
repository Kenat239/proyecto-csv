import Gps, { IGps } from '../modelos/gps';

interface ICrearGps {
    serie: string;
    imei: string
    latitud: number;
    longitud: number;
    velocidad: number;
    alarma: string;
}

//=======================================================
// Crear GPS
//=======================================================
async function CrearGps({
    serie,
    imei,
    latitud,
    longitud,
    velocidad,
    alarma,
}: ICrearGps): Promise<IGps> {
    return Gps.create({
        serie,
        imei,
        latitud,
        longitud,
        velocidad,
        alarma,
    })
    .then( ( datos: IGps ) => {
        return datos;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}
//=======================================================
// Consultar todos los GPS's Activos
//=======================================================
async function  CargarGpss(): Promise<IGps> {
    return Gps.find({status: 'ACTIVO'})
    .then( ( gpss: any ) => {
        return gpss;
    })
    .catch( ( error: Error ) => {
        throw error;
    })
}

//=======================================================
// Consultar todos los GPS's disponibles
//=======================================================
async function DispGpss(): Promise<IGps> {
    return Gps.find ({status2: 'DISPONIBLE'})
    .then (  (gpsD: any) => {
        return gpsD;
    })
    .catch (  (error: Error) => {
        throw error;
    })
}

//=======================================================
// Buscar GPS especifico
//=======================================================
async function BuscarGps( id: any ){

    return new Promise( ( resolve, reject ) => {
        Gps.findById({_id: id }, 'serie latitud longitud velocidad alarma status')
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        })
    })
}
//=======================================================
// Desactivar o Activar GPS
//=======================================================
async function DesactivarGps( id: string, stat: string ){
    return new Promise( ( resolve, reject ) => {
        Gps.updateOne( { _id: id }, { $set: { status: stat } } )
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            
            reject( error );
        });
    });
}


export {
    BuscarGps,
    CrearGps,
    CargarGpss,
    DesactivarGps,
    DispGpss
}