import axios, { AxiosError } from 'axios'
import { routesQuiz } from "../routes/public"
import { IAnswerSentByServer } from '../../interfaces/Quiz'
import { IAnswerPlayer } from '../../interfaces/Quiz/IQuizMatch'

interface IResponseCheckAnswers {
  message: string
  answers: IAnswerSentByServer | null
}

const Quiz = {
  async checkAnswers(answers: IAnswerPlayer): Promise<IResponseCheckAnswers> {
    try {
      const { data } = await axios.post(
        routesQuiz.checkAnswers,
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
