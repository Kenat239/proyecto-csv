"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = __importDefault(require("../modelos/menu"));
//===================================================================
// Crear menu
//===================================================================
function CrearMenu({ role, titulo, icono }) {
    return __awaiter(this, void 0, void 0, function* () {
        return menu_1.default.create({
            role,
            titulo,
            icono
        })
            .then((menuCreado) => {
            return menuCreado;
        })
            .catch((error) => {
            throw error;
        });
    });
}
exports.CrearMenu = CrearMenu;
//===================================================================
// Crear submenu
//===================================================================
function CrearSubMenu({ menu, submenu }) {
    return __awaiter(this, void 0, void 0, function* () {
        return menu_1.default.findByIdAndUpdate(menu, { $push: { submenu: submenu } })
            .then((menuUpdate) => {
            return menuUpdate;
        })
            .catch((error) => {
            return error;
        });
    });
}
exports.CrearSubMenu = CrearSubMenu;
function MenuRole(role) {
    return __awaiter(this, void 0, void 0, function* () {
        if (role == 'USER_ROLE') {
            return menu_1.default.find({ role: role }, 'titulo icono submenu')
                .then((menuUsuario) => {
                return menuUsuario;
            })
                .catch((error) => {
                return error;
            });
        }
        if (role == 'ADMIN_ROLE') {
            return menu_1.default.find({ role: role }, 'titulo icono submenu')
                .then((menuUsuario) => {
                return menuUsuario;
            })
                .catch((error) => {
                return error;
            });
        }
    });
}
exports.MenuRole = MenuRole;
