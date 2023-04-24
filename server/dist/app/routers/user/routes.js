"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routersUserProfile = exports.routersUserQuiz = void 0;
const Quiz_1 = __importDefault(require("../../controllers/user/Quiz"));
const User_1 = __importDefault(require("../../controllers/user/User"));
exports.routersUserQuiz = [
    {
        path: "/creating-quiz",
        controller: Quiz_1.default.creatingQuiz,
        method: "post"
    },
    {
        path: "/get-quizzes-by-created-user",
        controller: Quiz_1.default.getQuizzes,
        method: "get"
    },
    {
        path: "/get-quiz-by-created-user/:id",
        controller: Quiz_1.default.getQuiz,
        method: "get"
    },
];
exports.routersUserProfile = [
    {
        path: "/get-profile-picture-options",
        controller: User_1.default.getProfilePictureOptions,
        method: "get"
    },
    {
        path: "/change-profile-picture",
        controller: User_1.default.changeProfilePicture,
        method: "post"
    },
    {
        path: "/get-infos-user",
        controller: User_1.default.getInfosUser,
        method: "get"
    }
];
