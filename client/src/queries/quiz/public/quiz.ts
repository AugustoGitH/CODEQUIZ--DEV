import axios from "axios";

import { QueryFunctionContext, useQuery } from "react-query";
import { queryClient } from "../../../services/queryClient";
import { routesQuiz } from "../../../services/routes/public";
import { IQuizSentToCustomer } from "../../../interfaces/Quiz";

async function getQuizPublic(ctx: QueryFunctionContext) {
    const [, idQuiz ] = ctx.queryKey
    const { data } = await axios.get(`${routesQuiz.quiz}/${idQuiz}`)
    return data?.data?.quiz
}


export default function useFetchQuizPublic(idQuiz: string){
    return useQuery<IQuizSentToCustomer>(["quiz-public", idQuiz ], getQuizPublic, {
        initialData: queryClient.getQueryData(["quiz-public"]),
        refetchOnWindowFocus: false
    })
}