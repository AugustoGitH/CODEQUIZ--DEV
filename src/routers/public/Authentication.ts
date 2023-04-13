import { Router } from 'express'
import controllers from '../../controllers/public/Authentication'

const router = Router()

router.post('/login', controllers.login)
router.post('/register', controllers.register)
router.get('/logout', controllers.logout)

export default router
