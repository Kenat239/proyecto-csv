import Gps, { IGps } from '../modelos/gps';
import Last, { ILast } from '../modelos/last';
import historial, { IHistorial } from '../modelos/historial';
import { resolve } from 'path';
import last from '../modelos/last';


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
//=======================================================
// ubicaciones
//=======================================================
interface ICrearlast{
    idGps:ILast['idGps'];
    latitud:ILast['latitud'];
    longitud:ILast['longitud'];
    altitud: ILast['altitud'];
    velocidad: ILast['velocidad'];
    fechaRegistro: ILast['fechaRegistro'];
    horaRegistro: ILast['horaRegistro'];
}
interface ICrearHistorial{
    idGps:IHistorial['idGps']; 
    protocolo:IHistorial['protocolo']; 
     imei: IHistorial['imei'];
     latitud: IHistorial['latitud'];
     longitud: IHistorial['longitud'];
     altitud: IHistorial['altitud'];
     valida:IHistorial['valida'];
     velocidad: IHistorial['velocidad'];
     curso:IHistorial['curso'];
     direccion:IHistorial['direccion'];
     precision:IHistorial['precision'];
     alarma: IHistorial['alarma'];
     status: IHistorial['status'];
     status2: IHistorial['status2'];
     nivelbateria:IHistorial['nivelbateria'];
     distancia:IHistorial['distancia'];
     distanciatotal:IHistorial['distanciatotal'];
     movimiento:IHistorial['movimiento'];
}
async function lastUbication ({  
    idGps,
    protocolo,
    imei,
    latitud,
    longitud,
    altitud,
    valida,
    velocidad,
    curso,
    direccion,
    precision,
    alarma,
    status,
    status2,
    nivelbateria,
    distancia,
    distanciatotal,
    movimiento,} : ICrearHistorial ): Promise<IHistorial>{ 
        return historial.create({
            idGps,
            protocolo,
            imei,
            latitud,
            longitud,
            altitud,
            valida,
            velocidad,
            curso,
            direccion,
            precision,
            alarma,
            status,
            status2,
            nivelbateria,
            distancia,
            distanciatotal,
            movimiento,  
        })
        .then( ( data: any )=> {
            console.log(data.gps);
            return Last.findOne({idGps: data.gps})
            .then( ( lastData: any )=> {
                console.log(lastData);
              if( lastData === null ){
                return Last.create({
                    idGps: data.gps,
                    latitud,
                    longitud,
                    altitud,
                    velocidad,
                }).then(( dataLast: any) => {
                    return dataLast;
                }).catch(( error2: Error ) => {
                    return error2;
                })
            }
            else{
                console.log(data.gps);
                return Last.updateOne({idGps: data.gps}, { latitud: data.latitud, longitud: data.longitud, altitud: data.altitud, velocidad: data.velocidad }).then(( datoGuardado: any) => {
                    return datoGuardado;
                }).catch(( error3: Error ) => {
                    return error3;
                });
            }
                
            }).catch( ( error1: Error ) => {
                return error1;
            })
        
        })
        .catch( ( error: Error ) => {
            return error;
        })
        
        }
export {
    BuscarGps,
    CrearGps,
    CargarGpss,
    DesactivarGps,
    DispGpss,
    lastUbication,
    
}