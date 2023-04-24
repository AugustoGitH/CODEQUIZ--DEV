
// -------------- Geral --------------

export type IDifficultyLevel =
  | 'beginner'
  | 'intermediary'
  | 'avanced'
  | 'assembly-level'

export type ITechnology = 'javascript' | 'css' | "html"

export interface IAlternative {
  id: string
  value: string
  type: string
  letter: string
  correct: boolean
}

export interface ITypeBlockCode{
  value: string,
  langMode: ITechnology | "" 
}

export interface ITypeImage{
  url: string
}

export interface ITypesComplement{
  blockCode: ITypeBlockCode,
  image: ITypeImage
}

export interface IQuestion {
  id: string
  question: string
  typesComplement: ITypesComplement
  alternatives: IAlternative[]
}

// -------------- ----- --------------

export interface IAnswerServerQuestion{
  idQuestion: string
  alternative: {
    id: string | null
    correct: boolean
  }
}

export interface IAnswerSentByServer {
  idQuiz: string
  answersCorrectly: IAnswerServerQuestion[]
}



// -------------- ----- --------------

export interface IQuizSentToCustomer {
  id: string
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number | null
  createdAt: Date,
  creator?: {
    profileImg: string | null,
    name: string | null
  }
}

// -------------- ----- --------------

export interface IQuizSentByCustomer {
  id: string,
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number | null
}

// -------------- ----- --------------

export interface IPlayerResponseToStatistic {
  isUser: boolean,
  idPlayer?: string,
  answer: IAnswerSentByServer
}

export interface IQuizSentToUser {
  id: string
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number
  createdAt: Date,
  completedMatches: number,
  matchHistory: IPlayerResponseToStatistic[]
}
