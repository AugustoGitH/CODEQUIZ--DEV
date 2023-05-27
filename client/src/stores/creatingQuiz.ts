/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { create } from 'zustand'

import { HISTORY_QUIZ_PRODUCTION } from '../constants/localstorage'
import { IQuestion, IQuizSentByCustomer } from '../interfaces/Quiz'
import { IQuizSentByCustomerCreation } from '../interfaces/Quiz/IQuizCreation'
import creatingQuizService from '../services/user/quiz/CreatingQuiz'
import conditionProgressQuestion from '../settings/quiz/conditions'
import models from '../settings/quiz/models'

const historyQuizProduction: IQuizSentByCustomer | null = JSON.parse(
  localStorage.getItem(HISTORY_QUIZ_PRODUCTION) || 'null'
)

const saveToQuizLocalStorage = (quiz: IQuizSentByCustomerCreation) => {
  localStorage.setItem(HISTORY_QUIZ_PRODUCTION, JSON.stringify(quiz))
}

interface IUseCreatingStore {
  quizProducted: IQuizSentByCustomerCreation
  questionsProducted: IQuestion[] | []
  deleteQuestionQuiz: (id: string) => void
  addQuestionToQuiz: (question: IQuestion) => void
  resetQuiz: () => void
  addQuizAttributes: (value: any, key: keyof IQuizSentByCustomer) => void
  isProduction: boolean
}

const useCreatingQuizStore = create<IUseCreatingStore>((set) => ({
  quizProducted: historyQuizProduction || models.newQuiz(),
  questionsProducted: historyQuizProduction?.questions || [],
  isProduction: false,

  deleteQuestionQuiz: (id: string) => {
    const filteredQuestions = (questions: IQuestion[]) =>
      questions.filter((q) => q.id !== id)

    set((state) => ({
      quizProducted: {
        ...state.quizProducted,
        questions: filteredQuestions(state.questionsProducted),
      },
      questionsProducted: filteredQuestions(state.questionsProducted),
    }))
  },
  addQuestionToQuiz: (question: IQuestion) => {
    set((state) => ({
      quizProducted: {
        ...state.quizProducted,
        questions: [...state.questionsProducted, question],
      },
      questionsProducted: [...state.questionsProducted, question],
    }))
  },
  resetQuiz: () => {
    localStorage.removeItem(HISTORY_QUIZ_PRODUCTION)
    set({
      questionsProducted: [],
      quizProducted: models.newQuiz(),
      isProduction: false,
    })
  },
  addQuizAttributes: (value: string, key: string) => {
    if (value) {
      set((state) => ({
        quizProducted: { ...state.quizProducted, [key]: value },
        isProduction: true,
      }))
    }
  },
}))

interface IParamsSubmitQuiz {
  whenHaveError: (message: string) => void
  whenFinishSend: () => void
  whenSend: () => void
}

export const useCreatingQuiz = () => {
  const {
    quizProducted,
    addQuestionToQuiz,
    resetQuiz,
    questionsProducted,
    addQuizAttributes,
    deleteQuestionQuiz,
    isProduction,
  } = useCreatingQuizStore()

  const [question, setQuestion] = useState<IQuestion>(models.newQuestion())
  const [isResetQuestion, setIsResetQuestion] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isProduction) {
      saveToQuizLocalStorage(quizProducted)
    }
  }, [quizProducted])

  const addQuestionAttributes = (value: any, key: keyof IQuestion) => {
    setQuestion((prevQuestion) => ({ ...prevQuestion, [key]: value }))
  }

  const resetPreviousQuestion = () => {
    setQuestion(models.newQuestion())
    setIsResetQuestion(true)
    setTimeout(() => setIsResetQuestion(false), 100)
  }

  const addQuestion = (onFinally?: () => void) => {
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
        queryClient.invalidateQueries(['quizzes-by-created'])

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
    deleteQuestionQuiz,
  }
}
