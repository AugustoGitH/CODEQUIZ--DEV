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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Quiz_1 = __importDefault(require("../../db/models/Quiz"));
const Quiz_2 = require("../../db/schemas/Quiz");
const refactoringQuizes_1 = require("../../utils/quiz/refactoringQuizes");
const quizCreating_1 = __importDefault(require("../../settings/quizCreating"));
function returnCreatorId(token) {
    try {
        const { idUser } = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || '');
        return {
            message: 'Id do criador resgatado com sucesso!',
            idCreator: idUser,
            error: null,
        };
    }
    catch (error) {
        return {
            message: 'Houve um erro ao buscar id do criador do quiz!',
            idCreator: null,
            error,
        };
    }
}
exports.default = {
    creatingQuiz(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const quiz = req.body;
            if (!quiz)
                return res.status(404).send({
                    message: 'O quiz não foi enviado para a sua criação!',
                });
            const { error } = (0, Quiz_2.schemaQuiz)(quiz);
            if (error)
                return res.status(400).send({
                    message: error.message,
                });
            try {
                const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || ''];
                const resCreatorId = returnCreatorId(token);
                const quizzesByCreated = yield Quiz_1.default.find({
                    creatorId: resCreatorId.idCreator,
                });
                const { limitedQuizzes } = quizCreating_1.default.configs;
                if (quizzesByCreated.length >= limitedQuizzes)
                    return res.status(401).send({
                        message: `O seu limite estorou! Você pode criar apenas ${limitedQuizzes} quizzes.`,
                    });
                if (!resCreatorId.idCreator) {
                    console.log(`Id do criador não encontrado! 
        Verifique o console. error: ${resCreatorId.error}`);
                    return res.status(404).send({
                        message: `Ocorreu um erro ao criar o seu quiz! 
          Tente novamente ou consulte o desenvolvedor.`,
                    });
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const newQuiz = yield new Quiz_1.default(Object.assign(Object.assign({}, quiz), { creatorId: resCreatorId.idCreator })).save();
                res.status(200).send({
                    message: 'Quiz criado com sucesso!',
                });
            }
            catch (error) {
                console.log(`Ocorreu um erro ao criar o quiz. error: ${error}`);
                res.status(500).send({
                    message: `Ocorreu um erro ao criar o seu quiz! 
        Tente novamente ou consulte o desenvolvedor.`,
                });
            }
        });
    },
    getQuizesCreateBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || ''];
                const resCreatorId = returnCreatorId(token);
                if (!resCreatorId.idCreator) {
                    console.log(`Id do criador não encontrado! 
        Verifique o console. error: ${resCreatorId.error}`);
                    return res.status(404).send({
                        message: `Ocorreu um erro ao resgatar quiz criado por você! 
          Tente novamente ou consulte o desenvolvedor.`,
                    });
                }
                const quizzes = yield Quiz_1.default.find({
                    creatorId: resCreatorId.idCreator,
                });
                res.status(200).send({
                    message: 'Quizes resgatados com sucesso!',
                    data: { quizzes: (0, refactoringQuizes_1.userCreatedQuizzes)(quizzes) },
                });
            }
            catch (error) {
                console.log(`Ocorreu um erro ao criar o quiz. error: ${error}`);
                res.status(500).send({
                    message: `Ocorreu um erro interno no servidor ao resgatar seus quizes! 
        Entre em contato com o desenvolvedor e reporte o erro.`,
                });
            }
        });
    },
};
