import mongoose, { Schema, Document } from 'mongoose';


export interface ICsv extends Document {

    cabecera1: string,
    cabecera2: string,
    cabecera3: string
   
}

const csvShema: Schema = new Schema ({
    cabecera1: {type:String, required: [true, 'se necesita mas informacion']},
    cabecera2: {type:String, required: [true, 'se necesita mas informacion']},
    cabecera3: {type:String, required: [true, 'se necesita mas informacion']}
    
}, {collection: 'Csv'})

export default mongoose.model<ICsv>('Csv', csvShema);