import controllersQuiz from "../../controllers/user/Quiz"
import controllersUser from "../../controllers/user/User"

import { TRoute } from "../public/types"



export const routersUserQuiz = [
  {
    path: "/creating-quiz",
    controller: controllersQuiz.creatingQuiz,
    method: "post"
  },
  {
    path: "/get-quizzes-by-created-user",
    controller: controllersQuiz.getQuizzes,
    method: "get"
  },
  {
    path: "/get-quiz-by-created-user/:id",
    controller: controllersQuiz.getQuiz,
    method: "get"
  },
] as TRoute[]

export const routersUserProfile = [
  {
    path: "/get-profile-picture-options",
    controller: controllersUser.getProfilePictureOptions,
    method: "get"
  },
  {
    path: "/change-profile-picture",
    controller: controllersUser.changeProfilePicture,
    method: "post"
  },
  {
    path: "/get-infos-user",
    controller: controllersUser.getInfosUser,
    method: "get"
  }
] as TRoute[]