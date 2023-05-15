

import {
    IAnswerPlayerQuestion,
    IAnswerServerQuestion,
    ICorrectAnswer,
    IQuestion,
  } from '../../interfaces/IQuiz'
import quizCreatingSettings from '../../settings/quizCreating'

export default function checkQuestionsCorrectly(
    originQuestions: IQuestion[],
    playerResonses: IAnswerPlayerQuestion[]
  ) {
    const { limitedQuestions } = quizCreatingSettings.configs
    const tratedPlayerResponses = playerResonses.slice(0, limitedQuestions)
  

    const correctAnswers: ICorrectAnswer[] = originQuestions.map((quest) => ({
      idQuestion: quest.id,
      idAlternative:
        quest.alternatives.find((alt) => alt.correct)?.id || null,
    }))


    const answersQuestionsServer: IAnswerServerQuestion[] =
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