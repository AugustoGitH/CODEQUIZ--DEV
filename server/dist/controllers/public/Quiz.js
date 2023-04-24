"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const Quiz_1 = __importDefault(require("../../db/models/Quiz"));
const refactoringQuizes_1 = require("../../utils/quiz/refactoringQuizes");
const quizCreating_1 = __importDefault(require("../../settings/quizCreating"));
const checkQuestionsCorrectly_1 = __importDefault(require("../../utils/quiz/checkQuestionsCorrectly"));
exports.default = {
    getQuizzesPublic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quizzes = yield Quiz_1.default.find({});
                res.send({
                    message: 'Quizzes resgatados com sucesso!',
                    data: { quizzes: refactoringQuizes_1.refactoringQuizPublic.map(quizzes) },
                });
            }
            catch (error) {
                console.log(error);
                res.send({
                    message: 'Ocorreu um erro ao buscar quizzes. Entre em contato com o desenvolvedor',
                });
            }
        });
    },
    checkAnswers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const answersPlayer = req.body;
            const { idQuiz, answers: playerAnswers } = answersPlayer;
            const { limitedQuestions } = quizCreating_1.default.configs;
            try {
                const quiz = yield Quiz_1.default.findById({ _id: idQuiz });
                if (!quiz)
                    return res.status(404).send({
                        message: 'Quiz não encontrado!',
                    });
                const correctAnswers = quiz.questions.map((quest) => {
                    var _a;
                    return ({
                        idQuestion: quest.id,
                        idAlternative: ((_a = quest.alternatives.find((alt) => alt.correct)) === null || _a === void 0 ? void 0 : _a.id) || null,
                    });
                });
                const answersQuestionsServer = (0, checkQuestionsCorrectly_1.default)(correctAnswers, playerAnswers);
                if (answersQuestionsServer.length !== limitedQuestions)
                    return res.status(500).send({
                        message: 'Ocorreu um erro interno no servidor! Contate o desenvolvedor!',
                    });
                const answersServer = {
                    idQuiz,
                    answersCorrectly: answersQuestionsServer,
                };
                res.status(200).send({
                    message: 'As respostas do quiz foram tratadas e verificadas com sucesso!',
                    data: { answer: answersServer },
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({
                    message: 'Ocorreu um erro interno no servidor! Contate o desenvolvedor!',
                });
            }
        });
    },
    getQuizPublic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: idQuiz } = req.params;
            try {
                const quiz = yield Quiz_1.default.findById({ _id: idQuiz });
                if (!quiz)
                    return res.status(404).send({
                        message: "Quiz não encontrado!"
                    });
                res.status(200).send({
                    message: "Quiz resgatado com sucesso!",
                    data: { quiz: refactoringQuizes_1.refactoringQuizPublic.find(quiz) }
                });
            }
            catch (error) {
                console.log(error);
                res.status(404).send({
                    message: "Ocorreu um erro interno no servidor, contate o desenvolvedor!"
                });
            }
        });
    }
};
