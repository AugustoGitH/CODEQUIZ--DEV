"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaQuiz = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const quizCreating_1 = __importDefault(require("../../settings/quizCreating"));
const { limitedQuestions, limitedAlternatives } = quizCreating_1.default.configs;
const schemaQuiz = (data) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string().required(),
        technology: joi_1.default.string().required(),
        difficulty: joi_1.default.string().required(),
        questionTime: joi_1.default.number().required(),
        questions: joi_1.default.array()
            .items(joi_1.default.object({
            id: joi_1.default.string().required(),
            question: joi_1.default.string().required(),
            typesComplement: joi_1.default.object({
                blockCode: joi_1.default.object({
                    langMode: joi_1.default.string().optional().allow(""),
                    value: joi_1.default.string().optional().allow("")
                }),
                image: joi_1.default.object({
                    url: joi_1.default.string().optional().allow("")
                }),
            }),
            alternatives: joi_1.default.array()
                .items(joi_1.default.object({
                id: joi_1.default.string().required(),
                value: joi_1.default.string().required(),
                type: joi_1.default.string().required(),
                letter: joi_1.default.string().required(),
                correct: joi_1.default.boolean().required(),
            }))
                .min(2)
                .max(limitedAlternatives)
                .required(),
        }))
            .min(limitedQuestions)
            .max(limitedQuestions),
    });
    return schema.validate(data);
};
exports.schemaQuiz = schemaQuiz;
