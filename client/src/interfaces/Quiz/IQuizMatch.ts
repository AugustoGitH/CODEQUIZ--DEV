


export interface IAnswerPlayerQuestion{
  idAlternative: string | null
  idQuestion: string
}

export interface IAnswerPlayer {
  idQuiz: string
  answers: IAnswerPlayerQuestion[]
}

export interface IIssueResolutionTime {
  id: string
  timeInSeconds: number
}
