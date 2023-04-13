import axios from "axios";
import urls from "../services/urls";
import { useQuery } from "react-query";
import { IQuiz } from "../interfaces/IQuiz";
import { queryClient } from "../services/queryClient";


async function getUserCreatedQuizzes(){
    const { data } =  await axios.get(urls.private.quiz.routes.getCreatedByCreator)
    return data?.data?.quizzes
}

export default function useFetchUserCreatedQuizzes(){
    return useQuery<IQuiz[]>(["quizes-by-created"], getUserCreatedQuizzes, {
        initialData: queryClient.getQueryData(["quizes-by-created"]),
        staleTime: 1000 * 60 // 1 minuto
    })
}
