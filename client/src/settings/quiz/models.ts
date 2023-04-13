import generateId from '../../utils/generateID'
import { IQuiz, IAlternative, IQuestion, ITypesComplement } from '../../interfaces/IQuiz'

interface ICreateAlternative {
  value: string
  type: string
  numberIndex: number
  correct: boolean
}

const models = {
  newTypesComplement: (): ITypesComplement => ({
    blockCode: {
      langMode: "",
      value: ""
    },
    image: {
      url: ""
    }
  }),
  newQuiz: (): IQuiz => ({
    id: generateId(30),
    questions: [],
    technology: '',
    difficulty: '',
    questionTime: null
  }),
  newQuestion():IQuestion{
    return {
      id: generateId(30),
      question: '',
      typesComplement: this.newTypesComplement(),
      alternatives: [],
      }
  },
  newAlternative: ({
    value,
    type,
    numberIndex,
    correct,
  }: ICreateAlternative): IAlternative => ({
      id: generateId(20),
      value: value || '',
      type: type || '',
      letter: 'ABCD'[numberIndex || 0],
      correct: correct || false,
  }),
}

export default models
