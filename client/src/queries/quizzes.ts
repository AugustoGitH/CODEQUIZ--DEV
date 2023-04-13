import axios from "axios";
import urls from "../services/urls";
import { queryClient } from "../services/queryClient";
import { useQuery } from "react-query";
import { IQuiz } from "../interfaces/IQuiz";


async function getQuizzes(){
    const { data } =  await axios.get(urls.public.quiz.routes.quizzes)
    return data?.data?.quizzes
}

export default function useFetchQuizzes(){
    return useQuery<IQuiz[]>(["quizzes-public"], getQuizzes, {
        initialData: queryClient.getQueryData(["quizzes-public"]),
        staleTime: 1000 * 60 // 1 minuto
    })
}