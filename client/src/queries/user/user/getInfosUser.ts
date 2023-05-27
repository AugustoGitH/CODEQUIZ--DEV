import { useQuery } from 'react-query'

import axios from 'axios'

import { IUserSentToSelf } from '../../../interfaces/IUser'
import { queryClient } from '../../../services/queryClient'
import { routesUser } from '../../../services/routes/user'

async function getInfosUser() {
  const { data } = await axios.get(routesUser.getInfosUser)
  return data?.data?.user
}

function useFetchGetInfosUser() {
  return useQuery<IUserSentToSelf>(['infos-user'], getInfosUser, {
    initialData: queryClient.getQueryData(['infos-user']),
    staleTime: 1000 * 60, // 1 minuto
  })
}

export default useFetchGetInfosUser
