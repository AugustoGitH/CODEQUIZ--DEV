"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refactoringQuizPublic = exports.userCreatedQuizzes = void 0;
const userCreatedQuizzes = (databaseQuizzes) => {
    return databaseQuizzes.map((quiz) => ({
        id: quiz._id.toString(),
        technology: quiz.technology,
        difficulty: quiz.difficulty,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        questionTime: quiz.questionTime,
    }));
};
exports.userCreatedQuizzes = userCreatedQuizzes;
exports.refactoringQuizPublic = {
    props(quiz) {
        return {
            id: quiz._id.toString(),
            technology: quiz.technology,
            difficulty: quiz.difficulty,
            createdAt: quiz.createdAt,
            questionTime: quiz.questionTime,
            questions: quiz.questions.map(question => (Object.assign(Object.assign({}, question), { alternatives: question.alternatives.map(alternative => (Object.assign(Object.assign({}, alternative), { correct: false }))) })))
        };
    },
    map(quizzes) {
        return quizzes.map(quiz => this.props(quiz));
    },
    find(quiz) {
        return this.props(quiz);
    }
};
