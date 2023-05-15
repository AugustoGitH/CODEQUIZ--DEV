import axios, { AxiosError } from 'axios'
import { routesQuiz } from "../routes/public"
import { IAchievementSentByServer, IAnswerSentByServer } from '../../interfaces/Quiz'
import { IAnswerPlayer } from '../../interfaces/Quiz/IQuizMatch'

interface IResponseCheckAnswers {
  message: string
  answers: IAnswerSentByServer | null,
  achievement: IAchievementSentByServer | null
}

const Quiz = {
  async checkAnswers(answer: IAnswerPlayer): Promise<IResponseCheckAnswers> {
    try {
      const { data } = await axios.post(
        routesQuiz.checkAnswers,
        answer
      )
      return {
        message: data?.message || 'Erro interno do servidor',
        answers: data?.data.answer || null,
        achievement: data?.data.achievement || null
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return {
          message: error.response?.data.message || 'Erro interno do servidor',
          answers: null,
          achievement: null
        }
      } else {
        return {
          message: 'Erro interno do servidor',
          answers: null,
          achievement: null
        }
      }
    }
  },
}

export default Quiz
