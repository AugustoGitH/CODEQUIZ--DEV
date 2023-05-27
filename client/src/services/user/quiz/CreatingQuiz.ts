import axios, { AxiosError } from 'axios'

import { IQuizSentByCustomerCreation } from '../../../interfaces/Quiz/IQuizCreation'
import { routesQuiz } from '../../routes/user'

interface IResponseCreatingQuiz {
  message: string
  status: boolean
}

export default async function creatingQuiz(
  quiz: IQuizSentByCustomerCreation
): Promise<IResponseCreatingQuiz> {
  try {
    const { data } = await axios.post(routesQuiz.creatingQuiz, quiz)

    return { message: data?.message, status: true }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { response } = error
      return {
        message:
          response?.data?.message ||
          'Erro interno do servidor ao criar seu quiz.',
        status: false,
      }
    } else
      return {
        message: 'Erro interno do servidor ao criar seu quiz.',
        status: false,
      }
  }
}
