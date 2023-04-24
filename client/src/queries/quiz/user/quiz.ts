import axios from "axios";

import { QueryFunctionContext, useQuery } from "react-query";
import { queryClient } from "../../../services/queryClient";

import { IQuizSentToUser } from "../../../interfaces/Quiz";
import { routesQuiz } from "../../../services/routes/user";

async function getUserCreatedQuiz(ctx: QueryFunctionContext) {
    const [, idQuiz ] = ctx.queryKey
    const { data } = await axios.get(`${routesQuiz.getQuizByCreateUser}/${idQuiz}`)
    return data?.data?.quiz
}


export default function useFetchUserCreatedQuiz(idQuiz: string){
    return useQuery<IQuizSentToUser>(
      ["quiz-created-user", idQuiz ], getUserCreatedQuiz, {
        initialData: queryClient.getQueryData(["quiz-public"]),
        refetchOnWindowFocus: false
    })
}