import controllersAuthentication from "../../controllers/public/Authentication"
import controllersVerifyToken from "../../controllers/public/VerifyToken"
import controllersQuiz from "../../controllers/public/Quiz"

import { TRoute } from "./types"


export const routersAuthentication = [
  {
    path: "/login",
    controller: controllersAuthentication.login,
    method: "post"
  },
  {
    path: "/register",
    controller: controllersAuthentication.register,
    method: "post"
  },
  {
    path: "/logout",
    controller: controllersAuthentication.logout,
    method: "get"
  }
] as TRoute[]



export const routersVerifyToken  = [
  {
    path: "/verify-user",
    controller: controllersVerifyToken.user,
    method: "get"
  }
] as TRoute[]


export const routersQuiz = [
  {
    path: "/quizzes",
    controller: controllersQuiz.getQuizzesPublic,
    method: "get"
  },
  {
    path: "/quiz/:id",
    controller: controllersQuiz.getQuizPublic,
    method: "get"
  },
  {
    path: "/quiz/check-answers",
    controller: controllersQuiz.checkAnswers,
    method: "post"
  },
] as TRoute[]