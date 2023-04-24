"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resVerifyUser = ({ message, data }) => {
    return { message, data };
};
exports.default = {
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || ""];
                if (!token)
                    return res.send(resVerifyUser({
                        message: "O token de autorização não foi encontrado!",
                        data: { status: 404, user: { isLogged: false } }
                    }));
                const { name, email } = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
                return res.send(resVerifyUser({
                    message: `O token de autorização foi verificado. 
        Usuário verificado: ${name}`,
                    data: { status: 200, user: { isLogged: true, name, email } }
                }));
            }
            catch (error) {
                return res.send(resVerifyUser({
                    message: "Falha ao verificar o token de autorização",
                    data: { status: 401, user: { isLogged: false } }
                }));
            }
        });
    }
};
