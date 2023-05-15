import { 
  IAnswerServerQuestion,
  IDifficultyLevel, 
  IQuestion, 
  ITechnology 
} from "../../interfaces/IQuiz"

export interface IMatchHistoryPlayer {
  isUser: boolean,
  idPlayer: string | null,
  answers: IAnswerServerQuestion[],
  timeAverage: number,
  departureDate: Date
}

export interface IQuizModel{
  technology: ITechnology,
  difficulty: IDifficultyLevel,
  questions: IQuestion[],
  creatorId: string,
  questionTime: number,
  createdAt: Date,
  completedMatches: number,
  matchHistory: IMatchHistoryPlayer[]
}