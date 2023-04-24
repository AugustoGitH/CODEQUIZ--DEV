"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyCredentialsRouters(req, res, next) {
    try {
        const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || ''];
        if (!token)
            return res.status(401).send({
                message: 'O token de autorização não foi encontrado!',
            });
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
        return next();
    }
    catch (error) {
        res.status(401).send({
            message: 'Falha ao verificar o token de autorização!',
        });
    }
}
exports.default = verifyCredentialsRouters;
