import { Router, Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import routersQuiz from './Quiz'

const router = Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']

    if (!token)
      return res.status(401).send({
        message: 'O token de autorização não foi encontrado!',
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || '')
    return next()
  } catch (error) {
    res.status(401).send({
      message: 'Falha ao verificar o token de autorização!',
    })
  }
})

router.use('/quiz', routersQuiz)

export default router
