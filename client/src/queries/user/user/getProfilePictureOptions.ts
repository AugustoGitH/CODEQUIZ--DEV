import axios from "axios";
import { routesUser } from "../../../services/routes/user";
import { useQuery } from "react-query";


async function getProfilePictureOptions(){
  const { data } = await axios.get(routesUser.getProfilePictureOptions)
  return data?.data?.profilePictureOptions
}

export default function useFetchGetProfilePictureOptions(){
  return useQuery<string[]>(["profile-pictures-options"], getProfilePictureOptions)
}