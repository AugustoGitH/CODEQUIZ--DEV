

import {
    IAnswersPlayerAlternative,
    ICorrectAnswer,
    IAnswersServerAlternative,
  } from '../../interfaces/IQuiz'
import quizCreatingSettings from '../../settings/quizCreating'

export default function checkQuestionsCorrectly(
    correctAnswers: ICorrectAnswer[],
    playerResonses: IAnswersPlayerAlternative[]
  ) {
    const { limitedQuestions } = quizCreatingSettings.configs
    const tratedPlayerResponses = playerResonses.slice(0, limitedQuestions)
  
    const answersQuestionsServer: IAnswersServerAlternative[] =
      tratedPlayerResponses.map((question) => {
        const correct =
          correctAnswers.find(
            (questionCorrectly) =>
              questionCorrectly.idQuestion === question.idQuestion
          )?.idAlternative === question.idAlternative || false
        return {
          idQuestion: question.idQuestion,
          alternative: {
            id: question.idAlternative || null,
            correct,
          },
        }
      })
    return answersQuestionsServer
  }