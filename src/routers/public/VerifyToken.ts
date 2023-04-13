import { Router } from 'express'
import controllers from '../../controllers/public/VerifyToken'

const router = Router()

router.get('/verify-user', controllers.user)

export default router
