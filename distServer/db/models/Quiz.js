"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const quizSchema = new mongoose_1.Schema({
    technology: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: { type: Array, required: true },
    creatorId: { type: String, required: true },
    questionTime: { type: Number, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Quiz', quizSchema);
