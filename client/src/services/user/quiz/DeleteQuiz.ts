import axios, { AxiosError } from 'axios'

import { routesQuiz } from '../../routes/user'

interface IResponseDeleteQuiz {
  message: string
  status: boolean
}

export default async function deleteQuiz(
  idQuiz: string
): Promise<IResponseDeleteQuiz> {
  try {
    const { data } = await axios.delete(`${routesQuiz.deleteQuiz}/${idQuiz}`)

    return { message: data?.message, status: true }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { response } = error
      return {
        message:
          response?.data?.message ||
          'Erro interno do servidor ao deletar seu quiz.',
        status: false,
      }
    } else
      return {
        message: 'Erro interno do servidor ao deletar seu quiz.',
        status: false,
      }
  }
}
