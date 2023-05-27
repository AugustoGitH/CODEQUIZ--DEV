import { useQuery } from 'react-query'

import axios from 'axios'

import { IQuizSentToCustomer } from '../../../interfaces/Quiz'
import { queryClient } from '../../../services/queryClient'
import { routesQuiz } from '../../../services/routes/user'

async function getUserCreatedQuizzes() {
  const { data } = await axios.get(routesQuiz.getQuizzesByCreatedUser)
  return data?.data?.quizzes
}

export default function useFetchUserCreatedQuizzes() {
  return useQuery<IQuizSentToCustomer[]>(
    ['quizzes-by-created'],
    getUserCreatedQuizzes,
    {
      initialData: queryClient.getQueryData(['quizzes-by-created']),
      staleTime: 1000 * 60, // 1 minuto
    }
  )
}
