"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quizCreating_1 = __importDefault(require("../../settings/quizCreating"));
function checkQuestionsCorrectly(correctAnswers, playerResonses) {
    const { limitedQuestions } = quizCreating_1.default.configs;
    const tratedPlayerResponses = playerResonses.slice(0, limitedQuestions);
    const answersQuestionsServer = tratedPlayerResponses.map((question) => {
        var _a;
        const correct = ((_a = correctAnswers.find((questionCorrectly) => questionCorrectly.idQuestion === question.idQuestion)) === null || _a === void 0 ? void 0 : _a.idAlternative) === question.idAlternative || false;
        return {
            idQuestion: question.idQuestion,
            alternative: {
                id: question.idAlternative || null,
                correct,
            },
        };
    });
    return answersQuestionsServer;
}
exports.default = checkQuestionsCorrectly;
