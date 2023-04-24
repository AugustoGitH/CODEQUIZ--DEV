"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createRouters_1 = __importDefault(require("../../../../utils/routers/createRouters"));
const routes_1 = require("../routes");
const verifyCredentialsRouters_1 = __importDefault(require("../../../middlewares/verifyCredentialsRouters"));
const router = (0, express_1.Router)();
(0, createRouters_1.default)({
    router,
    middleware: verifyCredentialsRouters_1.default,
    routers: routes_1.routersUserQuiz,
});
exports.default = router;
