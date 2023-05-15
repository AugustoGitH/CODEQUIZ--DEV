/* eslint-disable max-len */
import Quiz from '../../../db/models/Quiz'
import { Request, Response } from 'express'
import { refactoringQuizPublic } from '../../../utils/quiz/refactoringQuizes'
import {
  IAchievementSentByServer,
  IAnswerPlayer,
  IAnswersServer,
  IQuizSentToCustomer,
} from '../../../interfaces/IQuiz'

import quizCreatingSettings from '../../../settings/quizCreating'

import checkQuestionsCorrectly from '../../../utils/quiz/checkQuestionsCorrectly'
import recordMatchData from '../../../db/utils/quiz/recordMatchData'
import User from '../../../db/models/User'
import checkAndSaveUserGame from '../../../utils/quiz/checkAndSaveUserGame'


export default {
  async getQuizzesPublic(req: Request, res: Response) {
    try {
      const quizzes = await Quiz.find({})

      const usersCreator = await Promise.all(quizzes.map(async quiz=>{
        return await User.findById(quiz.creatorId)
      }))

      const quizzesWitchCreator: IQuizSentToCustomer[] = quizzes.map(quiz=>{
        const creatorInfos = usersCreator.find(user=> user?._id.toString() === quiz.creatorId)
        return {
          ...refactoringQuizPublic.propsForSample(quiz),
          creator: {
            name: creatorInfos?.name || null,
            profileImg: creatorInfos?.profilePicture || null
          }
         }
      })

    
      res.send({
        message: 'Quizzes resgatados com sucesso!',
        data: { quizzes: quizzesWitchCreator},
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
    const answersPlayer: IAnswerPlayer = req.body

    const { idQuiz, answers: playerAnswers, timeAverage } = answersPlayer
    const { limitedQuestions } = quizCreatingSettings.configs


    try {
      const quiz = await Quiz.findById({ _id: idQuiz })
      if (!quiz)
        return res.status(404).send({
          message:
            'Quiz não encontrado!',
      })


      const answersQuestionsServer = checkQuestionsCorrectly(
        quiz.questions,
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

      const currentMatch = await recordMatchData({
        authToken: req.cookies[process.env?.NAME_TOKEN_AUTORIZATION || ""] || "",
        resolvedPlayerAnswer: {
          ...answersServer,
          timeAverage
        }
      })
  
      const achievement: IAchievementSentByServer | null = await checkAndSaveUserGame({ currentMatch, quiz })

      res.status(200).send({
        message:
          'As respostas do quiz foram tratadas e verificadas com sucesso!',
        data: { answer: answersServer, achievement },
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
        data: { quiz: refactoringQuizPublic.find(quiz, "focus") }
      })

    }catch(error){
      console.log(error)
      res.status(404).send({
        message: "Ocorreu um erro interno no servidor, contate o desenvolvedor!"
      })
    }
  }
}
