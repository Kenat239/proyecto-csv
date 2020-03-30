import Last, { ILast } from '../modelos/last';
import Historial, { IHistorial } from '../modelos/historial';







//=======================================================
// ubicaciones
//=======================================================
interface ICreateLast{
    idGps:ILast['idGps'],
 latitud: ILast['latitud'],
 longitud:ILast['longitud'],
 altitud: ILast['altitud'],
 velocidad: ILast['velocidad'],
 fechaRegistro: ILast['fechaRegistro'],
 horaRegistro:ILast['horaRegistro'],
}

interface ICreatHistorial{
    protocolo: IHistorial['protocolo'],
    imei: IHistorial['imei'],
     latitud: IHistorial['latitud'],
     longitud: IHistorial['longitud'],
     altitud: IHistorial['altitud'],
     valida:IHistorial['valida'],
     velocidad: IHistorial['velocidad'],
     curso:IHistorial['curso'],
     direccion:IHistorial['direccion'],
     precision:IHistorial['precision'],
     alarma: IHistorial['alarma'],
     status: IHistorial['status'],
     status2: IHistorial['status2'],
     nivelbateria:IHistorial['nivelbateria'],
     distancia:IHistorial['distancia'],
     distanciatotal:IHistorial['distanciatotal'],
     movimiento:IHistorial['movimiento'],
     gps:IHistorial['gps'],
};
async function HistorialAndLast({
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
     gps
}:ICreatHistorial):Promise<IHistorial>{
return Historial.create({
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
     gps
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
        return Last.updateOne({idGps: data.gps}, { latitud: data.latitud, longitud: data.longitud, altitud: data.altitud, velocidad: data.velocidad })
        .then(( datoGuardado: any) => {
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
    HistorialAndLast
}