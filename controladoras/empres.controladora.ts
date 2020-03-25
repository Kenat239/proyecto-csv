import Empresa, { IEmpresa } from '../modelos/empresa';


interface ICrearEmpresa {
    nombre: string,
    estado: string,
    status: string
}

//=======================================================
// Crear Empresa
//=======================================================
async function CrearEmpresa({
    nombre,
    estado,
    status
}: ICrearEmpresa): Promise<IEmpresa>{
    return Empresa.create({
        nombre,
        estado,
        status
    })
    .then( ( datos: IEmpresa ) => {
        return datos;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}
//=======================================================
// Consultar todas las Empresas Activas
//=======================================================
async function CargarEmpresas():Promise<IEmpresa>{
    return Empresa.find({status: 'ACTIVO'})
    .then( ( empresas: any ) => {
        return empresas;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}

//=======================================================
// buscar Empresa especifica por id
//=======================================================
async function BuscarEmpresa( id: any ){
    return new Promise( ( resolve, reject ) => {
        Empresa.findById({_id: id}, 'nombre estado status')
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}
//=======================================================
// Desactivar o Activar Empresa
//=======================================================
async function DesactivarEmpresa( id: string, stat: string ){
    return new Promise( ( resolve, reject ) => {
        Empresa.updateOne( { _id: id }, { $set: { status: stat } } )
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}

export {
    BuscarEmpresa,
    CargarEmpresas,
    CrearEmpresa,
    DesactivarEmpresa
}