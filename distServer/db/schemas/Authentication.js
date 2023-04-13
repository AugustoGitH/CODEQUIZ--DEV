"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaRegister = exports.schemaLogin = void 0;
/* eslint-disable max-len */
const joi_1 = __importDefault(require("@hapi/joi"));
const regexValidatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const schemaLogin = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().message('Email inválido!').required(),
        password: joi_1.default.string()
            .pattern(regexValidatePassword)
            // eslint-disable-next-line max-len
            .message('Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.')
            .required(),
    });
    return schema.validate(data);
};
exports.schemaLogin = schemaLogin;
const schemaRegister = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(4).max(20).required(),
        email: joi_1.default.string().email().message('Email inválido!').required(),
        password: joi_1.default.string()
            .pattern(regexValidatePassword)
            // eslint-disable-next-line max-len
            .message('Senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.')
            .required(),
    });
    return schema.validate(data);
};
exports.schemaRegister = schemaRegister;
