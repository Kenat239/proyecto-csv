"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario, id) {
        usuario.socketid = id;
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    // Actualizar usuario
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.socketid === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario');
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    getUsuario(id) {
        return this.lista.find((usuario) => {
            return usuario.socketid === id;
        });
    }
    // Obtener usuarios en una sala en particular
    // public getUsuariosEnSala( sala: string ) {
    //     return this.lista.filter( usuario => {
    //         return usuario.sala === sala;
    //     });
    // }
    // Borrar un usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.socketid !== id;
        });
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
