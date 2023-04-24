import { Router } from 'express'
import createRouters from '../../../../utils/routers/createRouters'
import { routersUserProfile } from "../routes"
import verifyCredentialsRouters from '../../../middlewares/verifyCredentialsRouters'

const router = Router()

createRouters({
  router,
  middleware: verifyCredentialsRouters,
  routers: routersUserProfile,
})

export default router