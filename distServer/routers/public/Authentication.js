"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authentication_1 = __importDefault(require("../../controllers/public/Authentication"));
const router = (0, express_1.Router)();
router.post('/login', Authentication_1.default.login);
router.post('/register', Authentication_1.default.register);
router.get('/logout', Authentication_1.default.logout);
exports.default = router;
