
// -------------- Geral --------------

import { IPlayerAnswer } from "../db/interfaces/IQuizModel"



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

// -------------- ----- --------------


export interface IQuizSentToCustomer {
  id: string
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number
  createdAt: Date,
  creator?: {
    profileImg: string | null,
    name: string | null
  }
}

// -------------- ----- --------------

export interface IQuizSentToUser {
  id: string
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number
  createdAt: Date,
  completedMatches: number,
  matchHistory: IPlayerAnswer[]
}

// -------------- ----- --------------


export interface IQuizSentByCustomer {
  id: string,
  technology: ITechnology
  difficulty: IDifficultyLevel
  questions: IQuestion[]
  questionTime: number
}

// -------------- ----- --------------

// -------------- ----- --------------

export interface IAnswerPlayerQuestion {
  idAlternative: string | null
  idQuestion: string
}

export interface IAnswerPlayer {
  idQuiz: string
  answers: IAnswerPlayerQuestion[]
}

// -------------- ----- --------------

// -------------- ----- --------------


export interface IAnswerServerQuestion {
  idQuestion: string
  alternative: {
    id: string | null
    correct: boolean
  }
}

export interface IAnswersServer {
  idQuiz: string
  answersCorrectly: IAnswerServerQuestion[]
}

// -------------- ----- --------------

// -------------- ----- --------------

export interface ICorrectAnswer {
  idAlternative: string | null
  idQuestion: string
}
