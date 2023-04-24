import { Router } from 'express'
import createRouters from '../../../../utils/routers/createRouters'
import { routersQuiz } from "../routes"

const router = Router()

createRouters({
  router,
  routers: routersQuiz,
})

export default router
