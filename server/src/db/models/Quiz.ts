import { model, Schema, Document } from 'mongoose'
import { IQuizModel } from '../interfaces/IQuizModel'

const quizSchema = new Schema(
  {
    technology: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: { type: Array, required: true },
    creatorId: { type: String, required: true },
    questionTime: { type: Number, required: true },
    completedMatches: { type: Number, default: 0 },
    matchHistory: { type: Array, default: [] }
  },
  { timestamps: true }
)

export default model<IQuizModel & Document>('Quiz', quizSchema)
