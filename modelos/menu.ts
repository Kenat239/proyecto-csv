import mongoose, { Schema, Document } from 'mongoose';

export interface IMenu extends Document {
    role: string;
    titulo: string;
    icono: string;
}

const menuSchema: Schema = new Schema({
    role: { type: String, required: [true, 'El role para menu es necesario'] },
    titulo: { type: String, required: [ true, 'El titulo de menu es necesario'] },
    icono: { type: String, required: [ true, 'El icono del menu es necesario'] },
    submenu: { type: Array, default:[] }
}, { collection: 'menus'} );

export default mongoose.model<IMenu>('Menu', menuSchema);