/* eslint-disable max-len */

import { IQuestion } from '../../interfaces/Quiz'
import { IQuizSentByCustomerCreation } from '../../interfaces/Quiz/IQuizCreation'

interface IConditionCreatingQuiz {
  question: IQuestion
  quiz: IQuizSentByCustomerCreation
}

interface IMesssageConditionCreatingQuiz {
  alert: string
  condition: boolean
}

const messageVerify = ({
  alert,
  condition,
}: IMesssageConditionCreatingQuiz) => {
  return { alert, condition }
}

export default function condition({
  quiz,
  question,
}: IConditionCreatingQuiz): IMesssageConditionCreatingQuiz {
  const fieldsVerify = [
    messageVerify({
      alert:
        "É preciso que você escolha uma 'tecnologia' que será o foco do seu quiz.",
      condition: !quiz.technology,
    }),
    messageVerify({
      alert: "É preciso que você escolha uma 'difuldade' para o seu quiz.",
      condition: !quiz.difficulty,
    }),
    messageVerify({
      alert:
        "É preciso que você escolha o 'tempo' máximo para resolver as questões.",
      condition: !quiz.questionTime,
    }),
    messageVerify({
      alert:
        "Para adicionar uma nova questão é necessário que preencha o campo 'Questão'.",
      condition: !question.question,
    }),
    messageVerify({
      alert: 'Você deve adicionar no minimo 2 alternativas.',
      condition: question.alternatives.length < 2,
    }),
    messageVerify({
      alert:
        'Para adicionar uma nova questão é necessário escolher um alternativa correta.',
      condition: !question.alternatives.find(
        (alternative) => alternative.correct
      ),
    }),
  ]
  return fieldsVerify.find(
    (field) => field.condition
  ) as IMesssageConditionCreatingQuiz
}
