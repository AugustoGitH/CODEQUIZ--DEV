import { endPointServices } from "../../settings/services"

export const endPointRoutes = "/public"
const generateRoute = (pathNome: string)=>{
  return `${endPointServices}/${endPointRoutes}/${pathNome}`
} 

export const routesAuthentication = {
  login: generateRoute("login"),
  register:  generateRoute("register"),
  logout:  generateRoute("logout")
}

export const routesVerifyToken = {
  user:  generateRoute("verify-user")
}

export const routesQuiz = {
  quizzes: generateRoute("quizzes"),
  quiz: generateRoute("quiz"),
  checkAnswers: generateRoute("quiz/check-answers"),
}