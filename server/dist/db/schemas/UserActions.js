"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaCratingQuiz = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const schemaCratingQuiz = (data) => {
    const schema = joi_1.default.object({
        technology: joi_1.default.string().required(),
        difficulty: joi_1.default.string().required(),
        questions: joi_1.default.array().items(joi_1.default.object({
            question: joi_1.default.string().required(),
            complement: joi_1.default.object({
                type: joi_1.default.string(),
                value: joi_1.default.string()
            }),
            alternatives: joi_1.default.array().items(joi_1.default.object({
                id: joi_1.default.string().required(),
                value: joi_1.default.string().required(),
                type: joi_1.default.string().required(),
                letter: joi_1.default.string().required(),
                correct: joi_1.default.boolean().required()
            })).min(2).max(4).required()
        })).min(5).max(5),
    });
    return schema.validate(data);
};
exports.schemaCratingQuiz = schemaCratingQuiz;
