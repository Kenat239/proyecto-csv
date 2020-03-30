"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const environment_1 = require("./global/environment");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// Importar rutas
const usuario_1 = __importDefault(require("./rutas/usuario"));
const gps_1 = __importDefault(require("./rutas/gps"));
const empresa_1 = __importDefault(require("./rutas/empresa"));
const vehiculo_1 = __importDefault(require("./rutas/vehiculo"));
const csv_1 = __importDefault(require("./rutas/csv"));
const uploads_1 = __importDefault(require("./rutas/uploads"));
const estados_1 = __importDefault(require("./rutas/estados"));
const last_1 = __importDefault(require("./rutas/last"));
const server = server_1.default.instance;
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de servicios
server.app.use('/usuario', usuario_1.default);
server.app.use('/gps', gps_1.default);
server.app.use('/empresa', empresa_1.default);
server.app.use('/vehiculo', vehiculo_1.default);
server.app.use('/csv', csv_1.default);
server.app.use('/upload', uploads_1.default);
server.app.use('/estado', estados_1.default);
server.app.use('/last', last_1.default);
// Conexión a base de datos mongoDB
mongoose_1.default.connect(`mongodb://${environment_1.DB_URL}`, { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if (err)
        throw err;
    const DB = environment_1.DB_URL.split('/');
    const DB_NAME = DB[DB.length - 1];
    console.log(`Conectado a la base de datos: ${DB_NAME}`);
});
server.start(() => {
    console.log(`Servidor corriendo en puerto ${environment_1.SERVER_PORT}`);
});
//========================
//prueba de gps
//========================
