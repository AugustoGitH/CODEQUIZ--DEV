import { create } from "zustand"
import { HISTORY_QUIZ_PRODUCTION } from "../constants/localstorage"
import { IQuestion, IQuiz } from "../interfaces/IQuiz"
import models from "../settings/quiz/models"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import conditionProgressQuestion from '../settings/quiz/conditions'
import creatingQuizService from '../services/user/quiz/CreatingQuiz'

const historyQuizProduction: IQuiz | null = JSON.parse(
    localStorage.getItem( HISTORY_QUIZ_PRODUCTION ) || "null"
)

const saveToQuizLocalStorage = (quiz: IQuiz)=>{
    localStorage.setItem(
        HISTORY_QUIZ_PRODUCTION,
        JSON.stringify(quiz)
    )
}



interface IUseCreatingStore{
    quizProducted: IQuiz,
    questionsProducted: IQuestion[] | [],
    deleteQuestionQuiz: (id: string)=> void,
    addQuestionToQuiz: (question: IQuestion)=> void,
    resetQuiz: ()=> void,
    addQuizAttributes: (value: any, key: string)=> void
}


const useCreatingQuizStore = create<IUseCreatingStore>((set)=>({

    quizProducted: historyQuizProduction || models.newQuiz(),
    questionsProducted: historyQuizProduction?.questions || [],

    deleteQuestionQuiz: (id: string)=>{
        const filteredQuestions = (questions: IQuestion[])=>(
            questions.filter(q=> q.id !== id)
        )

        set(state=>({
            quizProducted: {
                ...state.quizProducted,
                questions: filteredQuestions(state.questionsProducted)
            },
            questionsProducted: filteredQuestions(state.questionsProducted)
        }))
    },
    addQuestionToQuiz: (question: IQuestion)=> {
        set(state=>({
            quizProducted: {
                ...state.quizProducted,
                questions: [ ...state.questionsProducted, question ]
            },
            questionsProducted: [ ...state.questionsProducted, question ]
        }))
    },
    resetQuiz: ()=>{
        localStorage.removeItem(HISTORY_QUIZ_PRODUCTION);
        set({
            questionsProducted: [],
            quizProducted: models.newQuiz()
        })
    },
    addQuizAttributes: (value: string, key: string)=>{
        set(state=>({
            quizProducted: {...state.quizProducted, [key]: value  }
        }))
    }
}))



interface IParamsSubmitQuiz {
    whenHaveError: (message: string) => void
    whenFinishSend: () => void
    whenSend: () => void
  }


export const useCreatingQuiz = ()=>{
    const { 
        quizProducted, 
        addQuestionToQuiz, 
        resetQuiz,
        questionsProducted,
        addQuizAttributes,
        deleteQuestionQuiz
    } = useCreatingQuizStore()


    const [question, setQuestion] = useState<IQuestion>(models.newQuestion())
    const [isResetQuestion, setIsResetQuestion] = useState(false)
    const queryClient = useQueryClient()

    useEffect(()=>{
        saveToQuizLocalStorage(quizProducted)
    }, [quizProducted])


    const addQuestionAttributes = (value: any, key: string) =>{
        setQuestion(prevQuestion=> ({ ...prevQuestion, [key]: value }))
    }

    const resetPreviousQuestion = () => {
        setQuestion(models.newQuestion())
        setIsResetQuestion(true)
        setTimeout(() => setIsResetQuestion(false), 100)
    }

    const addQuestion = (onFinally?: ()=> void)=>{
        const conditionsVerify = conditionProgressQuestion({
            question,
            quiz: quizProducted,
        })
        if (conditionsVerify) return alert(conditionsVerify.alert)
      
        addQuestionToQuiz(question)
        resetPreviousQuestion()
      
        if (onFinally) onFinally() 
    }

    const submitQuiz = ({
        whenHaveError,
        whenFinishSend,
        whenSend,
      }: IParamsSubmitQuiz) => {
        const conditionsVerify = conditionProgressQuestion({
          question,
          quiz: quizProducted,
        })
        if (conditionsVerify) return alert(conditionsVerify.alert)
    
        whenSend()
        creatingQuizService({
          ...quizProducted,
          questions: [question, ...questionsProducted],
        }).then((response) => {
          const { message, status } = response
          if (status) {
            resetPreviousQuestion()
            resetQuiz()
            queryClient.invalidateQueries(['quizes-by-created'])
    
            whenFinishSend()
          } else {
            whenHaveError(message)
          }
        })
    }

    return {
        question,
        isResetQuestion,
        addQuestionAttributes,
        addQuestion,
        submitQuiz,
        quizProducted,
        questionsProducted,
        addQuizAttributes,
        deleteQuestionQuiz
        
    }
}