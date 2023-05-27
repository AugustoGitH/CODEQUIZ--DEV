import { useQuery } from 'react-query'

import axios from 'axios'

import { IQuizSentToCustomer } from '../../../interfaces/Quiz'
import { queryClient } from '../../../services/queryClient'
import { routesQuiz } from '../../../services/routes/public'

async function getQuizzes() {
  const { data } = await axios.get(routesQuiz.quizzes)
  return data?.data?.quizzes
}

export default function useFetchQuizzes() {
  return useQuery<IQuizSentToCustomer[]>(['quizzes-public'], getQuizzes, {
    initialData: queryClient.getQueryData(['quizzes-public']),
    staleTime: 1000 * 60, // 1 minuto
  })
}
