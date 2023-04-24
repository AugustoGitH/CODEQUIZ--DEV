import { Router } from 'express'
import { routersAuthentication } from "../routes"
import createRouters from '../../../../utils/routers/createRouters'

const router = Router()

createRouters({
  router,
  routers: routersAuthentication,
})


export default router
