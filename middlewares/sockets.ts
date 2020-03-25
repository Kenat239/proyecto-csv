import { Request, Response } from 'express';

function socketM( req: Request, res:Response, io: SocketIO.Server, next: any) {
    io.emit('url-nueva', req);
}

export default socketM;