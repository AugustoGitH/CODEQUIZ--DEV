"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Quiz_1 = __importDefault(require("../../controllers/user/Quiz"));
const router = (0, express_1.Router)();
router.post('/creating', Quiz_1.default.creatingQuiz);
router.get('/get-created-by-creator', Quiz_1.default.getQuizesCreateBy);
exports.default = router;
