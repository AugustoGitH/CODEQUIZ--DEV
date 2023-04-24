"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserActions_1 = __importDefault(require("../controllers/UserActions"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    try {
        const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || ""];
        if (!token)
            return res.status(401).send({
                message: "O token de autorização não foi encontrado!"
            });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
        return next();
    }
    catch (error) {
        res.status(401).send({
            message: "Falha ao verificar o token de autorização!"
        });
    }
});
router.post("/creating-quiz", UserActions_1.default.creatingQuiz);
router.get("/get-quizes-create-by", UserActions_1.default.getQuizesCreateBy);
exports.default = router;
