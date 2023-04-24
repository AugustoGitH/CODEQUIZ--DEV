"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refactoringQuizPublic = exports.refactoringQuizUser = void 0;
exports.refactoringQuizUser = {
    propsInFocus: (quiz) => ({
        id: quiz._id,
        technology: quiz.technology,
        difficulty: quiz.difficulty,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        questionTime: quiz.questionTime,
        completedMatches: quiz.completedMatches,
        matchHistory: quiz.matchHistory,
    }),
    propsForSample: (quiz) => ({
        id: quiz._id,
        technology: quiz.technology,
        difficulty: quiz.difficulty,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        questionTime: quiz.questionTime,
    }),
    map(quizzes, mode) {
        return quizzes.map(quiz => (this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)));
    },
    find(quiz, mode) {
        return this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz);
    }
};
exports.refactoringQuizPublic = {
    propsInFocus: (quiz) => ({
        id: quiz._id.toString(),
        technology: quiz.technology,
        difficulty: quiz.difficulty,
        createdAt: quiz.createdAt,
        questionTime: quiz.questionTime,
        questions: quiz.questions.map(question => (Object.assign(Object.assign({}, question), { alternatives: question.alternatives.map(alternative => (Object.assign(Object.assign({}, alternative), { correct: false }))) }))),
    }),
    propsForSample: (quiz) => ({
        id: quiz._id.toString(),
        technology: quiz.technology,
        difficulty: quiz.difficulty,
        createdAt: quiz.createdAt,
        questionTime: quiz.questionTime,
    }),
    map(quizzes, mode) {
        return quizzes.map(quiz => (this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)));
    },
    find(quiz, mode) {
        return this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz);
    }
};
