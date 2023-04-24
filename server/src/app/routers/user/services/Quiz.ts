import { Router } from 'express'
import createRouters from '../../../../utils/routers/createRouters'
import { routersUserQuiz } from "../routes"
import verifyCredentialsRouters from '../../../middlewares/verifyCredentialsRouters'

const router = Router()

createRouters({
  router,
  middleware: verifyCredentialsRouters,
  routers: routersUserQuiz,
})

export default router