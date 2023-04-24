"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyCredentials(token, secret) {
    if (!token)
        return { isUser: false, idUser: null };
    try {
        const { idUser } = jsonwebtoken_1.default.verify(token, secret);
        return { isUser: true, idUser };
    }
    catch (error) {
        return { isUser: false, idUser: null };
    }
}
exports.default = verifyCredentials;
