/* eslint-disable max-len */
import Quiz from '../../db/models/Quiz'
import { Request, Response } from 'express'
import { refactoringQuizPublic } from '../../utils/quiz/refactoringQuizes'
import {
  IAnswersPlayer,
  ICorrectAnswer,
  IAnswersServer,
} from '../../interfaces/IQuiz'

import quizCreatingSettings from '../../settings/quizCreating'

import checkQuestionsCorrectly from '../../utils/quiz/checkQuestionsCorrectly'


export default {
  async getQuizzesPublic(req: Request, res: Response) {
    try {
      const quizzes = await Quiz.find({})
      res.send({
        message: 'Quizzes resgatados com sucesso!',
        data: { quizzes: refactoringQuizPublic.map(quizzes)},
      })
    } catch (error) {
      console.log(error)
      res.send({
        message:
          'Ocorreu um erro ao buscar quizzes. Entre em contato com o desenvolvedor',
      })
    }
  },
  async checkAnswers(req: Request, res: Response) {
    const answersPlayer: IAnswersPlayer = req.body

    const { idQuiz, answers: playerAnswers } = answersPlayer
    const { limitedQuestions } = quizCreatingSettings.configs

    try {
      const quiz = await Quiz.findById({ _id: idQuiz })
      if (!quiz)
        return res.status(404).send({
          message:
            'Quiz não encontrado!',
        })

      const correctAnswers: ICorrectAnswer[] = quiz.questions.map((quest) => ({
        idQuestion: quest.id,
        idAlternative:
          quest.alternatives.find((alt) => alt.correct)?.id || null,
      }))

      const answersQuestionsServer = checkQuestionsCorrectly(
        correctAnswers,
        playerAnswers
      )

      if (answersQuestionsServer.length !== limitedQuestions)
        return res.status(500).send({
          message:
            'Ocorreu um erro interno no servidor! Contate o desenvolvedor!',
        })

      const answersServer: IAnswersServer = {
        idQuiz,
        answersCorrectly: answersQuestionsServer,
      }

      res.status(200).send({
        message:
          'As respostas do quiz foram tratadas e verificadas com sucesso!',
        data: { answer: answersServer },
      })

    } catch (error) {
      console.log(error)
      res.status(500).send({
        message:
          'Ocorreu um erro interno no servidor! Contate o desenvolvedor!',
      })
    }
  },
  async getQuizPublic(req: Request, res: Response){
    const { id: idQuiz } = req.params
    try{
      const quiz = await Quiz.findById({_id: idQuiz})
      if(!quiz) return res.status(404).send({
        message: "Quiz não encontrado!"
      })
      res.status(200).send({
        message: "Quiz resgatado com sucesso!",
        data: { quiz: refactoringQuizPublic.find(quiz) }
      })

    }catch(error){
      console.log(error)
      res.status(404).send({
        message: "Ocorreu um erro interno no servidor, contate o desenvolvedor!"
      })
    }
  }
}
