import Server from './clases/server';
import { SERVER_PORT, DB_URL } from './global/environment';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';


// Importar rutas
import usuarioRoutes from './rutas/usuario';
import gpsRoutes from './rutas/gps';
import empresaRoutes from './rutas/empresa';
import vehiculoRoutes from './rutas/vehiculo';
import csvRoutes from './rutas/csv';
import app from './rutas/uploads';
import estadoRoutes from './rutas/estados';


const server = Server.instance;

// BodyParser
server.app.use( bodyParser.urlencoded({extended: true}) );
server.app.use( bodyParser.json());

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicios
server.app.use('/usuario', usuarioRoutes );
server.app.use('/gps', gpsRoutes );
server.app.use('/empresa', empresaRoutes );
server.app.use( '/vehiculo', vehiculoRoutes );
server.app.use('/csv', csvRoutes);
server.app.use('/upload', app);
server.app.use('/estado', estadoRoutes)

// Conexión a base de datos mongoDB
mongoose.connect(`mongodb://${ DB_URL }`, { useCreateIndex: true, useNewUrlParser: true}, ( err ) => {

    if ( err ) throw err;

    const DB = DB_URL.split('/');
    const DB_NAME = DB[DB.length -1];
    
    console.log(`Conectado a la base de datos: ${ DB_NAME }`);
});


server.start(() => {
    console.log(`Servidor corriendo en puerto ${ SERVER_PORT }`);
});
