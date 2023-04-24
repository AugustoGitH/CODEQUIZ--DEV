import axios from "axios";
import { useQuery } from "react-query";

import { queryClient } from "../../../services/queryClient";
import { routesQuiz } from "../../../services/routes/user";
import { IQuizSentToCustomer } from "../../../interfaces/Quiz";


async function getUserCreatedQuizzes(){
    const { data } =  await axios.get(routesQuiz.getQuizzesByCreatedUser)
    return data?.data?.quizzes
}

export default function useFetchUserCreatedQuizzes(){
    return useQuery<IQuizSentToCustomer[]>(["quizes-by-created"], getUserCreatedQuizzes, {
        initialData: queryClient.getQueryData(["quizes-by-created"]),
        staleTime: 1000 * 60 // 1 minuto
    })
}
