"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyToken_1 = __importDefault(require("../../controllers/public/VerifyToken"));
const router = (0, express_1.Router)();
router.get('/verify-user', VerifyToken_1.default.user);
exports.default = router;
