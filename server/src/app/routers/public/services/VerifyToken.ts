import { Router } from 'express'
import createRouters from '../../../../utils/routers/createRouters'
import { routersVerifyToken } from "../routes"

const router = Router()

createRouters({
  router,
  routers: routersVerifyToken,
})

export default router