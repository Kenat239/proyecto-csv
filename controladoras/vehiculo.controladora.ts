import Vehiculo, { IVehiculo } from '../modelos/vehiculo';
import Gps,{ IGps } from '../modelos/gps';


interface ICrearVehiculo {
    placas: IVehiculo['placas'];
    noSerie: IVehiculo['noSerie'];
    gps: IVehiculo['gps'];
    empresa: IVehiculo['empresa'];
    
}
interface IActGps {
    status2: IGps ['status2']
}
//=======================================================
// Crear vehiculo
//====================================================


async function CrearVehiculo({
    placas,
    noSerie,
    gps,
    empresa,
   
}: ICrearVehiculo): Promise<IVehiculo>{
    return Vehiculo.create({
        placas,
        noSerie,
        gps,
        empresa
    })

    .then( ( datos: IVehiculo ) => {
         console.log (datos.gps)
         return new Promise ((resolve,reject) => {
            Gps.updateOne({_id:datos.gps}, {$set: {status2: 'no disponible'} })
            .then((gps:any) => {
                resolve(gps);
            })
            .catch((error:Error) => {
                reject(error);
            });
         }),
         
          datos;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}
//=======================================================
// Consultar todas los Vehiculos Activos
//=======================================================
async function CargarVehiculos():Promise<IVehiculo> {
    return Vehiculo.find({ status: 'ACTIVO'})
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

async function BuscarVehiculo( id: any ){

    return new Promise( ( resolve, reject) => {
        Vehiculo.findById({ _id: id }, 'placas noSerie empresa gps status')
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
async function DesactivarVehiculo( id: string, stat: string ){
    return new Promise( ( resolve, reject ) => {
        Vehiculo.updateOne( { _id: id }, { $set: { status: stat } } )
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}


export {
    BuscarVehiculo,
    CrearVehiculo,
    CargarVehiculos,
    DesactivarVehiculo
}