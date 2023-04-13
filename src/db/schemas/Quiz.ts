import Joi from '@hapi/joi'
import { IQuizClient } from '../../interfaces/IQuiz'
import settingsQuizCreating from '../../settings/quizCreating'

const { limitedQuestions, limitedAlternatives } = settingsQuizCreating.configs


const schemaQuiz = (data: IQuizClient) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    technology: Joi.string().required(),
    difficulty: Joi.string().required(),
    questionTime: Joi.number().required(),
    questions: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          question: Joi.string().required(),
          typesComplement: Joi.object({
            blockCode: Joi.object({
              langMode: Joi.string().optional().allow(""),
              value: Joi.string().optional().allow("")
            }),
            image: Joi.object({
              url: Joi.string().optional().allow("")
            }),
          }),
          alternatives: Joi.array()
            .items(
              Joi.object({
                id: Joi.string().required(),
                value: Joi.string().required(),
                type: Joi.string().required(),
                letter: Joi.string().required(),
                correct: Joi.boolean().required(),
              })
            )
            .min(2)
            .max(limitedAlternatives)
            .required(),
        })
      )
      .min(limitedQuestions)
      .max(limitedQuestions),
  })
  return schema.validate(data)
}

export { schemaQuiz }
