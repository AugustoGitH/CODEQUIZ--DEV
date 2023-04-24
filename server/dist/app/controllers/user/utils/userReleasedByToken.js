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
const User_1 = __importDefault(require("../../../../db/models/User"));
const refactoringUser_1 = require("../../../../utils/user/refactoringUser");
function userReleasedByToken(token) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return { user: null };
        try {
            const tokenDecoded = jsonwebtoken_1.default.verify(token, ((_a = process.env) === null || _a === void 0 ? void 0 : _a.TOKEN_SECRET) || "");
            const user = yield User_1.default.findById(tokenDecoded.idUser);
            if (!user)
                return { user: null };
            return {
                user: refactoringUser_1.refactoringUser.find(user)
            };
        }
        catch (error) {
            console.log(error);
            return { user: null };
        }
    });
}
exports.default = userReleasedByToken;
