"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refactoringUser = void 0;
exports.refactoringUser = {
    props: (user) => ({
        email: user.email,
        name: user.name,
        profilePicture: user.profilePicture
    }),
    find(quiz) {
        return this.props(quiz);
    }
};
