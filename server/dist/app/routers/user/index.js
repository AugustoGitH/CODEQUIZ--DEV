"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Quiz_1 = __importDefault(require("./services/Quiz"));
const User_1 = __importDefault(require("./services/User"));
const router = (0, express_1.Router)();
const endPoint = "/user";
router.use(endPoint, Quiz_1.default);
router.use(endPoint, User_1.default);
exports.default = router;
