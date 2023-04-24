import { 
  IAnswersServer, 
  IDifficultyLevel, 
  IQuestion, 
  ITechnology 
} from "../../interfaces/IQuiz"

export interface IPlayerAnswer {
  isUser: boolean,
  idPlayer?: string,
  answer: IAnswersServer
}

export interface IQuizModel{
  technology: ITechnology,
  difficulty: IDifficultyLevel,
  questions: IQuestion[],
  creatorId: string,
  questionTime: number,
  createdAt: Date,
  completedMatches: number,
  matchHistory: IPlayerAnswer[]
}