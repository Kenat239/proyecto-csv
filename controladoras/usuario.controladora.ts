import Usuario, { IUsuario} from '../modelos/usuario';


interface ICrearUsuario {
    nombre: IUsuario['nombre'];
    apellidoP: IUsuario['apellidoP'];
    apellidoM: IUsuario['apellidoM'];
    email: IUsuario['email'];
    password: IUsuario['password'];   
    empresa: IUsuario['empresa'];     
}

interface ILogin {
    email: IUsuario['email'];
}

//===================================================================
// Login usuario
//===================================================================
async function LoginUsuario({
    email
}: ILogin): Promise<IUsuario> {
    return Usuario.findOne({
        email: email 
    })
    .then((datos: any) => {
        return datos;
    })
    .catch((error: Error) => {
        return error;
    });
}


//===================================================================
// Crear usuario
//===================================================================
async function CrearUsuario({
    nombre,
    apellidoP,
    apellidoM,
    email,
    password,
    empresa
}: ICrearUsuario): Promise<IUsuario> {
    return Usuario.create({
        nombre,
        apellidoP,
        apellidoM,
        email,
        password,
        empresa
    })
    .then((datos: IUsuario) => {
        return datos;
    })
    .catch((error: Error) => {
        throw error;
    });
}

//===================================================================
// Cargar usuarios
//===================================================================
async function CargarUsuarios(): Promise<IUsuario>{
    return Usuario.find()
    .then( ( usuarios: any ) => {
        return usuarios;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}

//===================================================================
// Modificar Usuario
//===================================================================
async function ActualizaUsuario( id: string, usuario: IUsuario ){
    return new Promise( ( resolve, reject ) => {
        Usuario.findByIdAndUpdate(id, usuario, { new: true } )
        .then( ( usuarioActualizado: any ) => {
            resolve( usuarioActualizado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        });
    });
}
//===================================================================
// DESACTIVAR O ACTIVAR Usuario
//===================================================================
async function DesactivarUsuario(id: string, stat: string ){
    return new Promise( ( resolve, reject ) => {
        Usuario.updateOne( {_id: id}, { $set: { status: stat } } )
        .then( ( resultado: any ) => {
            resolve( resultado );
        })
        .catch( ( error: Error ) => {
            reject( error );
        })
    })
}


export {
    ActualizaUsuario,
    CargarUsuarios,
    CrearUsuario,
    DesactivarUsuario,
    LoginUsuario
    
};