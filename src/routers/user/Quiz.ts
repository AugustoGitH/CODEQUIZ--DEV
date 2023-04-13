import { Router } from 'express'
import controllers from '../../controllers/user/Quiz'
const router = Router()

router.post('/creating', controllers.creatingQuiz)
router.get('/get-created-by-creator', controllers.getQuizesCreateBy)

export default router
