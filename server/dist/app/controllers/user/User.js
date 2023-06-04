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
const User_1 = __importDefault(require("../../../db/models/User"));
const user_1 = __importDefault(require("../../../settings/user"));
const userReleasedByToken_1 = __importDefault(require("./utils/userReleasedByToken"));
const { profilePictureOptions } = user_1.default;
exports.default = {
    getProfilePictureOptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send({
                message: 'As opções de imagem para perfil carregadas!',
                data: { profilePictureOptions },
            });
        });
    },
    changeProfilePicture(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { urlImageSelect } = req.body;
            const token = req.cookies[((_a = process.env) === null || _a === void 0 ? void 0 : _a.NAME_TOKEN_AUTORIZATION) || ''];
            if (!profilePictureOptions.includes(urlImageSelect))
                return res.status(404).send({
                    message: 'A imagem escolhida não faz parte das opções estabelecidas pelo servidor.',
                });
            try {
                const tokenDecoded = jsonwebtoken_1.default.verify(token, ((_b = process.env) === null || _b === void 0 ? void 0 : _b.TOKEN_SECRET) || '');
                yield User_1.default.updateOne({ _id: tokenDecoded.idUser }, {
                    profilePicture: urlImageSelect,
                });
                res.status(200).send({
                    message: 'Imagem de perfil alterada com sucesso!',
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({
                    message: 'Ocorreu um erro interno no servidor ao tentar mudar o seu perfil.',
                });
            }
        });
    },
    getInfosUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies[((_a = process.env) === null || _a === void 0 ? void 0 : _a.NAME_TOKEN_AUTORIZATION) || ''];
            const { user } = yield (0, userReleasedByToken_1.default)(token);
            if (!user)
                return res.status(404).send({
                    message: 'Usuario não foi encontrado!',
                });
            res.status(200).send({
                message: 'Dados do usuario resgatado com sucesso!',
                data: { user },
            });
        });
    },
};
