import axios, { AxiosError } from 'axios'
import { IQuiz } from '../../../interfaces/IQuiz'
import urlsAPI from '../../urls'

interface IResponseCreatingQuiz {
  message: string
  status: boolean
}

export default async function creatingQuiz(
  quiz: IQuiz
): Promise<IResponseCreatingQuiz> {
  try {
    const { data } = await axios.post(
      urlsAPI.private.quiz.routes.creating,
      quiz
    )

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
