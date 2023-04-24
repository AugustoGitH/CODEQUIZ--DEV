/* eslint-disable max-len */
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { ITokenPayload } from '../../../interfaces/IJWTUser'
import { IQuizSentByCustomer } from '../../../interfaces/IQuiz'

import Quiz from '../../../db/models/Quiz'

import { schemaQuiz } from '../../../db/schemas/Quiz'

import { refactoringQuizUser } from '../../../utils/quiz/refactoringQuizes'

import quizCreatingSettings from '../../../settings/quizCreating'

interface IResponseCreatorId {
  message: string
  idCreator: string | null
  error?: unknown
}

function returnCreatorId(token: string): IResponseCreatorId {
  try {
    const { idUser } = jwt.verify(
      token,
      process.env.TOKEN_SECRET || ''
    ) as ITokenPayload

    return {
      message: 'Id do criador resgatado com sucesso!',
      idCreator: idUser,
      error: null,
    }
  } catch (error: unknown) {
    return {
      message: 'Houve um erro ao buscar id do criador do quiz!',
      idCreator: null,
      error,
    }
  }
}

export default {
  async creatingQuiz(req: Request, res: Response) {
    const quiz: IQuizSentByCustomer = req.body

    if (!quiz)
      return res.status(404).send({
        message: 'O quiz não foi enviado para a sua criação!',
      })

    const { error } = schemaQuiz(quiz)
    if (error)
      return res.status(400).send({
        message: error.message,
      })

    try {
      const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']
      const resCreatorId: IResponseCreatorId = returnCreatorId(token)

      const quizzesByCreated = await Quiz.find({
        creatorId: resCreatorId.idCreator,
      })
      const { limitedQuizzes } = quizCreatingSettings.configs

      if (quizzesByCreated.length >= limitedQuizzes)
        return res.status(401).send({
          message: `O seu limite estorou! Você pode criar apenas ${limitedQuizzes} quizzes.`,
        })

      if (!resCreatorId.idCreator) {
        console.log(`Id do criador não encontrado! 
        Verifique o console. error: ${resCreatorId.error}`)

        return res.status(404).send({
          message: `Ocorreu um erro ao criar o seu quiz! 
          Tente novamente ou consulte o desenvolvedor.`,
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await new Quiz({
        ...quiz,
        creatorId: resCreatorId.idCreator,
      }).save()

      res.status(200).send({
        message: 'Quiz criado com sucesso!',
      })
    } catch (error) {
      console.log(`Ocorreu um erro ao criar o quiz. error: ${error}`)
      res.status(500).send({
        message: `Ocorreu um erro ao criar o seu quiz! 
        Tente novamente ou consulte o desenvolvedor.`,
      })
    }
  },
  async getQuizzes(req: Request, res: Response) {
    try {
      const token = req.cookies[process.env.NAME_TOKEN_AUTORIZATION || '']
      const resCreatorId: IResponseCreatorId = returnCreatorId(token)

      if (!resCreatorId.idCreator) {
        console.log(`Id do criador não encontrado! 
        Verifique o console. error: ${resCreatorId.error}`)

        return res.status(404).send({
          message: `Ocorreu um erro ao resgatar quiz criado por você! 
          Tente novamente ou consulte o desenvolvedor.`,
        })
      }

      const quizzes = await Quiz.find({
        creatorId: resCreatorId.idCreator,
      })
      res.status(200).send({
        message: 'Quizes resgatados com sucesso!',
        data: { quizzes: refactoringQuizUser.map(quizzes, "sample") },
      })
    } catch (error) {
      console.log(`Ocorreu um erro ao criar o quiz. error: ${error}`)
      res.status(500).send({
        message: `Ocorreu um erro interno no servidor ao resgatar seus quizes! 
        Entre em contato com o desenvolvedor e reporte o erro.`,
      })
    }
  },
  async getQuiz(req: Request, res: Response){
    const { id: idQuiz } = req.params
    try{
      const quiz = await Quiz.findById({_id: idQuiz})
      if(!quiz) return res.status(404).send({
        message: "Quiz não encontrado!"
      })
      res.status(200).send({
        message: "Quiz resgatado com sucesso!",
        data: { quiz: refactoringQuizUser.find(quiz, "focus") }
      })

    }catch(error){
      console.log(error)
      res.status(404).send({
        message: "Ocorreu um erro interno no servidor, contate o desenvolvedor!"
      })
    }
  }
}
