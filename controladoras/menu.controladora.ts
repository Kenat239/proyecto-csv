import Menu, { IMenu } from '../modelos/menu';

interface ICrearMenu {
    role: IMenu['role'];
    titulo: IMenu['titulo'];
    icono: IMenu['icono'];
}

//===================================================================
// Crear menu
//===================================================================

async function CrearMenu({
    role,
    titulo,
    icono
}: ICrearMenu ): Promise<IMenu>{
    return Menu.create({
        role,
        titulo,
        icono
    })
    .then( ( menuCreado: IMenu ) => {
        return menuCreado;
    })
    .catch( ( error: Error ) => {
        throw error;
    });
}

//===================================================================
// Crear submenu
//===================================================================

async function CrearSubMenu({
    menu,
    submenu
}: any ): Promise<IMenu> {
    return Menu.findByIdAndUpdate(menu, {$push: {submenu: submenu} } )
    .then((menuUpdate: any) => {
        return menuUpdate;
    })
    .catch( ( error: Error) => {
        return error;
    });
}

async function MenuRole ( role: string ) {
    if ( role == 'USER_ROLE' ) {
        return Menu.find( { role: role }, 'titulo icono submenu' )
        .then( ( menuUsuario: any) => {
            return menuUsuario;
        })
        .catch( ( error: Error) => {
            return error;
        });
    }

    if ( role == 'ADMIN_ROLE' ) {
        return Menu.find( { role: role}, 'titulo icono submenu' )
        .then( ( menuUsuario: any) => {
            return menuUsuario;
        })
        .catch( ( error: Error) => {
            return error;
        });
    }
}

export {
    CrearMenu,
    CrearSubMenu,
    MenuRole
}