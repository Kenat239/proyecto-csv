"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function socketM(req, res, io, next) {
    io.emit('url-nueva', req);
}
exports.default = socketM;
