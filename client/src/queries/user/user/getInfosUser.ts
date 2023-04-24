import axios from "axios";
import { routesUser } from "../../../services/routes/user";
import { useQuery } from "react-query";
import { queryClient } from "../../../services/queryClient";
import { IUserSentToSelf } from "../../../interfaces/IUser";


async function getInfosUser(){
  const { data } = await axios.get(routesUser.getInfosUser)
  return data?.data?.user
}

function useFetchGetInfosUser(){
  return useQuery<IUserSentToSelf>(["infos-user"], getInfosUser, {
    initialData: queryClient.getQueryData(["infos-user"]),
    staleTime: 1000 * 60 // 1 minuto
})
}

export default useFetchGetInfosUser