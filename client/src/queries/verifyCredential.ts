import axios from "axios";
import { useQuery } from "react-query"
import { routesVerifyToken } from "../services/routes/public";



async function getVerifyCredential(){
  const { data } = await axios.get(routesVerifyToken.user)
  return data?.isAuthenticated || false
}

export default function useFetchVerifyCredential(){
  return useQuery<boolean>(["verify-credential"], getVerifyCredential)
}