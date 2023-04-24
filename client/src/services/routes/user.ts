import { endPointServices } from "../../settings/services"

export const endPointRoutes = "/user"
const generateRoute = (pathNome: string)=>{
  return `${endPointServices}/${endPointRoutes}/${pathNome}`
} 

export const routesQuiz = {
  creatingQuiz: generateRoute("creating-quiz"),
  getQuizzesByCreatedUser:  generateRoute("get-quizzes-by-created-user"),
  getQuizByCreateUser: generateRoute("get-quiz-by-created-user")
}

export const routesUser = {
  getProfilePictureOptions: generateRoute("get-profile-picture-options"),
  changeProfilePicture: generateRoute("change-profile-picture"),
  getInfosUser: generateRoute("get-infos-user"),
}