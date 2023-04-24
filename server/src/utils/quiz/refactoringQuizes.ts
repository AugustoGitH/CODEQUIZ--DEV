import { Document } from 'mongoose'
import { IQuizModel } from '../../db/interfaces/IQuizModel'
import { IQuizSentToCustomer, IQuizSentToUser } from '../../interfaces/IQuiz'



export const refactoringQuizUser = {
  propsInFocus: (quiz: IQuizModel & Document): IQuizSentToUser=>({
    id: quiz._id,
    technology: quiz.technology,
    difficulty: quiz.difficulty,
    questions: quiz.questions,
    createdAt: quiz.createdAt,
    questionTime: quiz.questionTime,
    completedMatches: quiz.completedMatches,
    matchHistory: quiz.matchHistory,
    
  }),
  propsForSample: (quiz: IQuizModel & Document)=>({
    id: quiz._id,
    technology: quiz.technology,
    difficulty: quiz.difficulty,
    questions: quiz.questions,
    createdAt: quiz.createdAt,
    questionTime: quiz.questionTime,
  } as IQuizSentToUser),
  map(quizzes: (IQuizModel & Document)[], mode: "sample" | "focus" ){
    return quizzes.map(quiz=>(
      this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)
    ))
  },
  find(quiz: IQuizModel & Document, mode: "sample" | "focus" ){
    return this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)
  }
}



export const refactoringQuizPublic = {
  propsInFocus: (quiz: IQuizModel & Document): IQuizSentToCustomer=>({
    id: quiz._id.toString(),
    technology: quiz.technology,
    difficulty: quiz.difficulty,
    createdAt: quiz.createdAt,
    questionTime: quiz.questionTime,
    
    questions: quiz.questions.map(question=>({
      ...question,
      alternatives: question.alternatives.map(alternative=> ({
        ...alternative,
        correct: false
      })),
    })),
  }),
  propsForSample: (quiz: IQuizModel & Document)=>({
    id: quiz._id.toString(),
    technology: quiz.technology,
    difficulty: quiz.difficulty,
    createdAt: quiz.createdAt,
    questionTime: quiz.questionTime,
  } as IQuizSentToCustomer),
  map(quizzes: (IQuizModel & Document)[], mode: "sample" | "focus" ){
    return quizzes.map(quiz=>(
      this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)
    ))
  },
  find(quiz: IQuizModel & Document, mode: "sample" | "focus" ){
    return this[mode === "sample" ? "propsForSample" : "propsInFocus"](quiz)
  }
}