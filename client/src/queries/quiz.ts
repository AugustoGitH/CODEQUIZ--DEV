import axios from "axios";
import urls from "../services/urls";
import { IQuiz } from "../interfaces/IQuiz";
import { QueryFunctionContext, useQuery } from "react-query";
import { queryClient } from "../services/queryClient";

async function getQuiz(ctx: QueryFunctionContext) {
    const [, idQuiz ] = ctx.queryKey
    const { data } = await axios.get(`${urls.public.quiz.routes.quiz}/${idQuiz}`)
    return data?.data?.quiz
}


export default function useFetchQuiz(idQuiz: string){
    return useQuery<IQuiz>(["quiz-public", idQuiz ], getQuiz, {
        initialData: queryClient.getQueryData(["quiz-public"]),
        refetchOnWindowFocus: false
    })
}