import { Router } from 'express'
import routersQuiz from './services/Quiz'
import routersUser from './services/User'

const router = Router()

const endPoint = "/user"

router.use(endPoint, routersQuiz)
router.use(endPoint, routersUser)

export default router
