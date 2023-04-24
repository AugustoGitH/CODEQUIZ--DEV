"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Quiz_1 = __importDefault(require("../../controllers/public/Quiz"));
const router = (0, express_1.Router)();
router.get('/quizzes', Quiz_1.default.getQuizzesPublic);
router.get('/quiz/:id', Quiz_1.default.getQuizPublic);
router.post('/quiz/check-answers', Quiz_1.default.checkAnswers);
exports.default = router;
