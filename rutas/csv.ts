import {Router,Request,Response} from 'express';
import csvtojson from 'csvtojson';
//import {MongoClient} from 'mongodb';
//import { DB_URL } from '../global/environment';
 import Csv, {ICsv} from '../modelos/csv';
/*
1.-error para documento en blanco,
2.- error para documeno invalido,

*/
const csvRoutes = Router()

csvRoutes.put ('/', (req:Request, res:Response) =>{
    
    csvtojson()
    .fromFile ('./uploads/Csvs/filename.csv')
    .then((csv:any)=> {
        if (!csvtojson ) {
        return res.status(401).json ({
            ok: false,
            mensaje: 'no hay datos en el archivo',

        })
    }
        
           res.status(200).json ({
           ok:true,
           mensaje: 'establecido archivo csv',
           prueba:csv
       }), 
       console.log(csv),

       Csv.insertMany (csv, (err:Error, res) => {
        if (err) throw err;

        console.log(res);
        
      
        })
        
            
        
    })
    
});

/*

csvRoutes.put ('/', (req:Request, res:Response) =>{
    const mongodb = MongoClient;
    let url = `mongodb://${DB_URL}`;

    csvtojson()
    .fromFile ('./uploads/Csvs/filename.csv')
    .then((csv:any)=> {
       return res.status(200).json ({
           ok:true,
           mensaje: 'establecido archivo csv',
           prueba:csv
       }), 
       console.log(csv),

       mongodb.connect(
           url, 
           { useNewUrlParser:true},
           ((err:Error, Client) => {
               if (err) throw err;

               Client
               .db("nematronix")
               .collection('csvs')
               .insertMany (csv, (err:Error, res) => {
                   if (err) throw err;

                   console.log(`guardados: ${res.insertedCount} ficheros`);
                   Client.close();
               })
           })
       )
    })
});

*/


export default csvRoutes