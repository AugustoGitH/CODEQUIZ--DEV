import axios, { AxiosError } from 'axios'
import urlsAPI from '../urls'
import { IAnswersPlayer, IAnswersServer } from '../../interfaces/IQuiz'

interface IResponseCheckAnswers {
  message: string
  answers: IAnswersServer | null
}

const Quiz = {
  async checkAnswers(answers: IAnswersPlayer): Promise<IResponseCheckAnswers> {
    try {
      const { data } = await axios.post(
        urlsAPI.public.quiz.routes.checkAnswers,
        answers
      )
      return {
        message: data?.message || 'Erro interno do servidor',
        answers: data?.data.answer || null,
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.message || 'Erro interno do servidor',
          answers: null,
        }
      } else {
        return {
          message: 'Erro interno do servidor',
          answers: null,
        }
      }
    }
  },
}

export default Quiz
