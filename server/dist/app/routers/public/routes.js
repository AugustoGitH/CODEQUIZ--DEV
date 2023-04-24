"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routersQuiz = exports.routersVerifyToken = exports.routersAuthentication = void 0;
const Authentication_1 = __importDefault(require("../../controllers/public/Authentication"));
const VerifyToken_1 = __importDefault(require("../../controllers/public/VerifyToken"));
const Quiz_1 = __importDefault(require("../../controllers/public/Quiz"));
exports.routersAuthentication = [
    {
        path: "/login",
        controller: Authentication_1.default.login,
        method: "post"
    },
    {
        path: "/register",
        controller: Authentication_1.default.register,
        method: "post"
    },
    {
        path: "/logout",
        controller: Authentication_1.default.logout,
        method: "get"
    }
];
exports.routersVerifyToken = [
    {
        path: "/verify-user",
        controller: VerifyToken_1.default.user,
        method: "get"
    }
];
exports.routersQuiz = [
    {
        path: "/quizzes",
        controller: Quiz_1.default.getQuizzesPublic,
        method: "get"
    },
    {
        path: "/quiz/:id",
        controller: Quiz_1.default.getQuizPublic,
        method: "get"
    },
    {
        path: "/quiz/check-answers",
        controller: Quiz_1.default.checkAnswers,
        method: "post"
    },
];
