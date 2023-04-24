"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../routes");
const createRouters_1 = __importDefault(require("../../../../utils/routers/createRouters"));
const router = (0, express_1.Router)();
(0, createRouters_1.default)({
    router,
    routers: routes_1.routersAuthentication,
});
exports.default = router;
