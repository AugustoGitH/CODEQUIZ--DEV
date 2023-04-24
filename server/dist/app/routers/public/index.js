"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authentication_1 = __importDefault(require("./services/Authentication"));
const Quiz_1 = __importDefault(require("./services/Quiz"));
const VerifyToken_1 = __importDefault(require("./services/VerifyToken"));
const router = (0, express_1.Router)();
const endPoint = "/public";
router.use(endPoint, Authentication_1.default);
router.use(endPoint, Quiz_1.default);
router.use(endPoint, VerifyToken_1.default);
exports.default = router;
