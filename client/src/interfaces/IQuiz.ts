export interface IAlternative {
  id: string
  value: string
  type: string
  letter: string
  correct: boolean
}

export type IDifficultyLevel =
  | 'beginner'
  | 'intermediary'
  | 'avanced'
  | 'assembly-level'
  | ""
  

export type ITechnology = 'javascript' | 'css' | "html" | ""

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

export interface IQuiz {
  id: string
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number | null
  createdAt?: Date
  [key: string]: string | number | IQuestion[] | null | Date | undefined
}








export interface IAnswersPlayerAlternative {
  idAlternative: string | null
  idQuestion: string
}

export interface IAnswersPlayer {
  idQuiz: string
  answers: IAnswersPlayerAlternative[]
}

export interface IIssueResolutionTime {
  id: string
  timeInSeconds: number
}

export interface IAnswersServerAlternative {
  idQuestion: string
  alternative: {
    id: string | null
    correct: boolean
  }
}

export interface IAnswersServer {
  idQuiz: string
  answersCorrectly: IAnswersServerAlternative[]
}
