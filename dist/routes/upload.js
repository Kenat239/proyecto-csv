"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = require("express");
const fs_1 = __importStar(require("fs"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Modelos
const usuario_1 = require("../modelos/usuario");
const uploadRoutes = express_1.Router();
uploadRoutes.use(express_fileupload_1.default());
uploadRoutes.post('/:tipo/:id', (req, res, next) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            err: { messages: 'Debe seleccionar un archivo' }
        });
    }
    // Obtener nombre del archivo
    const archivo = req.files.imagen;
    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // Tipos validos
    const tiposValidos = ['usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El tipo no es valido',
            err: { message: 'Los tipos validos son ' + tiposValidos.join(', ') }
        });
    }
    // Extensiones validas
    const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no valida',
            err: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }
    // Generar nombre de archivo
    const nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
    // Mover archivo al path predeterminado
    const path = `./dist/uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                err: err
            });
        }
        if (!fs_1.existsSync(path)) {
            fs_1.default.mkdir(path, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al crear directorio',
                        err: err
                    });
                }
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res);
    });
});
function subirPorTipo(tipo, id, nombreArchivo, res) {
    // Actualizar base de datos con imagen de usuario
    if (tipo === 'usuarios') {
        usuario_1.Usuario.findById(id, (err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error en base de datos al tratar de actualizar imagen de usuario',
                    err: err
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + ' no existe',
                    err: err
                });
            }
            // Si existe una imagen de usuario, la reemplaza
            const pathViejo = './dist/uploads/usuarios/' + usuario.img;
            if (fs_1.default.existsSync(pathViejo)) {
                fs_1.default.unlink(pathViejo, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualizar imagen',
                        err: err
                    });
                }
                usuarioActualizado.password = 'XD';
                res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen actualizada',
                    usuario: usuarioActualizado
                });
            });
        });
    }
}
exports.default = uploadRoutes;
