import { Router } from 'express'
import controllers from '../../controllers/public/Quiz'

const router = Router()

router.get('/quizzes', controllers.getQuizzesPublic)
router.get('/quiz/:id', controllers.getQuizPublic)

router.post('/quiz/check-answers', controllers.checkAnswers)

export default router
