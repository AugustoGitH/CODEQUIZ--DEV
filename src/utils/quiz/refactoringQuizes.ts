import { Document } from 'mongoose'
import { IQuizServer } from '../../interfaces/IQuiz'


export const userCreatedQuizzes = (
  databaseQuizzes: (IQuizServer & Document)[]
): IQuizServer[] => {
  return databaseQuizzes.map((quiz) => ({
    id: quiz._id.toString(),
    technology: quiz.technology,
    difficulty: quiz.difficulty,
    questions: quiz.questions,
    createdAt: quiz.createdAt,
    questionTime: quiz.questionTime,
  }))
}

export const refactoringQuizPublic = {
  props(quiz: IQuizServer & Document){
    return {
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
      }))
    }
  },
  map(quizzes: (IQuizServer & Document)[] ){
    return quizzes.map(quiz=> this.props(quiz))
  },
  find(quiz: IQuizServer & Document){
    return this.props(quiz)
  }
}