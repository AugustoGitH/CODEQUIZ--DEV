import { IDifficultyLevel, IQuestion, ITechnology } from "."


export interface IQuizSentByCustomerCreation {
  id: string,
  technology: ITechnology | ""
  difficulty: IDifficultyLevel | ""
  questions: IQuestion[]
  questionTime: number | null
}
