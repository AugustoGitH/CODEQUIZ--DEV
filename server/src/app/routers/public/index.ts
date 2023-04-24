import { Router } from 'express'

import routersAuthentication from './services/Authentication'
import routersQuiz from './services/Quiz'
import routersVerifyToken from './services/VerifyToken'

const router = Router()

const endPoint = "/public"

router.use(endPoint, routersAuthentication)
router.use(endPoint, routersQuiz)
router.use(endPoint, routersVerifyToken)


export default router