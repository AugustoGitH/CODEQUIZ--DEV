"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyUserRoutes_1 = __importDefault(require("../controllers/VerifyUserRoutes"));
const router = (0, express_1.Router)();
router.get("/verify-user", VerifyUserRoutes_1.default.user);
exports.default = router;
