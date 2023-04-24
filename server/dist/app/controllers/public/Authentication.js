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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../../db/models/User"));
const Authentication_1 = require("../../../db/schemas/Authentication");
exports.default = {
    login(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).send({
                    message: 'Email ou senha não encontrados!',
                });
            const { error } = (0, Authentication_1.schemaLogin)({ email, password });
            if (error)
                return res.status(400).send({
                    message: error.message,
                });
            try {
                const userSearch = yield User_1.default.findOne({ email });
                const passwordCryptoMath = userSearch
                    ? bcryptjs_1.default.compare(password, userSearch.password)
                    : null;
                if (!userSearch || !passwordCryptoMath)
                    return res.status(401).send({
                        message: 'Email ou senha incorretos!',
                    });
                const tokenJWT = jsonwebtoken_1.default.sign({ email, name: userSearch.name, idUser: userSearch._id }, ((_a = process.env) === null || _a === void 0 ? void 0 : _a.TOKEN_SECRET) || '');
                res
                    .status(200)
                    .cookie(((_b = process.env) === null || _b === void 0 ? void 0 : _b.NAME_TOKEN_AUTORIZATION) || 'tokenAuthorization', tokenJWT, {
                    secure: true,
                    httpOnly: true,
                })
                    .send({
                    message: 'O processo de login foi realizado com sucesso!',
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send({
                    message: 'Ocorreu um erro inesperado internamente no servidor. Verifique o console da aplicação.',
                });
            }
        });
    },
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return res.status(400).send({
                    message: 'Dados de entrada inválidos! Verifique se nenhum dos valores passado é indefinido ou nulo.',
                });
            const { error } = (0, Authentication_1.schemaRegister)({ email, password, name });
            if (error)
                return res.status(400).send({
                    message: error.message,
                });
            try {
                const userSearch = yield User_1.default.findOne({ email });
                if (userSearch)
                    return res.status(409).send({
                        message: 'Esse email já está registrado em nosso sistema!',
                    });
                const passwordCrypto = bcryptjs_1.default.hashSync(password, 10);
                const newUser = yield new User_1.default({
                    name,
                    email,
                    password: passwordCrypto,
                }).save();
                res.status(201).send({
                    message: `Bem vindo ${newUser.name}! Seu registro foi realizado com sucesso!`,
                });
            }
            catch (e) {
                console.log(`Erro interno do servidor: ${e}`);
                res.status(500).send({
                    message: 'Ocorreu um erro inesperado internamente no servidor. Verifique o console da aplicação.',
                });
            }
        });
    },
    logout(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie(process.env.NAME_TOKEN_AUTORIZATION || '');
                res.status(200).send({
                    message: 'O logout foi realizado com sucesso!',
                });
            }
            catch (e) {
                console.log(`Erro interno do servidor: ${e}`);
                res.status(500).send({
                    message: 'Houve um erro interno no servidor ao fazer logout! Tente novamente ou entre em contato com o desenvolvedor.',
                });
            }
        });
    },
};
