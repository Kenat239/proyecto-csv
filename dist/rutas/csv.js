"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const csvtojson_1 = __importDefault(require("csvtojson"));
//import {MongoClient} from 'mongodb';
//import { DB_URL } from '../global/environment';
const csv_1 = __importDefault(require("../modelos/csv"));
/*
1.-error para documento en blanco,
2.- error para documeno invalido,

*/
const csvRoutes = express_1.Router();
csvRoutes.put('/', (req, res) => {
    csvtojson_1.default()
        .fromFile('./uploads/Csvs/filename.csv')
        .then((csv) => {
        return res.status(200).json({
            ok: true,
            mensaje: 'establecido archivo csv',
            prueba: csv
        }),
            console.log(csv),
            csv_1.default.insertMany(csv, (err, res) => {
                if (err)
                    throw err;
                console.log(res);
            });
    });
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
exports.default = csvRoutes;
