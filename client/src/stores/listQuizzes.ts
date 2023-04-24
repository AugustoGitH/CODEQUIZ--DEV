
import { create } from "zustand"
import { useEffect } from "react"
import useFetchQuizzes from "../queries/quiz/public/quizzes"
import { IQuizSentToCustomer } from "../interfaces/Quiz"

interface IAttrsQuizFiltered{
    technology: string,
    difficulty: string
}

interface IUseListQuizzesStore{
    quizzesToScreen: IQuizSentToCustomer[] | null,
    quizzes: IQuizSentToCustomer[] | null,
    setQuizzes: (quizzes: IQuizSentToCustomer[])=> void,
    filterQuizzes: ({ technology, difficulty }: IAttrsQuizFiltered)=> void
}



const useListQuizzesStore = create<IUseListQuizzesStore>((set)=> ({
    quizzesToScreen: null,
    quizzes: null,

    setQuizzes: (quizzes: IQuizSentToCustomer[] | null)=>{
        set({ quizzesToScreen: quizzes })
        set({ quizzes })
    },

    filterQuizzes: ({ technology, difficulty }: IAttrsQuizFiltered)=>{
        set(state=> ({ quizzesToScreen: state.quizzes }))
        if (technology === "all" && difficulty === "all"){
            set(state=> ({ quizzesToScreen: state.quizzes }))
        }
        if (technology && technology !== "all") {
            set(state=> ({ 
                quizzesToScreen: state.quizzesToScreen?.filter(quiz=> (
                    quiz.technology === technology
                )) || null
            }))
        }
        if (difficulty && difficulty !== "all") {
            set(state=> ({ 
                quizzesToScreen: state.quizzesToScreen?.filter(quiz=> (
                    quiz.difficulty === difficulty
                )) || null
            }))
        }
    }
}))


export const useQuizzes = ()=>{
    const { setQuizzes, quizzesToScreen, filterQuizzes } = useListQuizzesStore()

    const { data: quizzes, isFetching } = useFetchQuizzes()

    useEffect(()=>{
        if(quizzes){
            setQuizzes(quizzes)
        }
    }, [quizzes])

    return { quizzesToScreen, filterQuizzes, isFetching }
}

