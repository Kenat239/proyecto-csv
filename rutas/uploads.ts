import { Router, Request, Response } from 'express';
import fileupload from 'express-fileupload';




const app = Router();
app.use(fileupload());

// =====================================================
//   Subida de archivos                   
// =====================================================
app.put('/', ( req:Request, res:Response ) => {
    if (!req.files) {
        res.status(400).json({
            ok:false,
            mensaje: 'no seleccionó el archivo'
        });

        return
    }

    const archivo: any = req.files.archivo

    archivo.mv('./uploads/Csvs/filename.csv', (err:any) =>{
        if (err) {
            res.status(500).json({    
                ok:false,
                mensaje: 'Error al subir',
                err:err
            });
        }

        res.status(200).json({
            ok:true,
            mensaje: 'Archivo subido correctamente',
            archivo:archivo
        });
    });

});

export default app