import { model, Schema, Document } from 'mongoose'
import { IQuizServer } from '../../interfaces/IQuiz'

const quizSchema = new Schema(
  {
    technology: { type: String, required: true },
    difficulty: { type: String, required: true },
    questions: { type: Array, required: true },
    creatorId: { type: String, required: true },
    questionTime: { type: Number, required: true },
  },
  { timestamps: true }
)

export default model<IQuizServer & Document>('Quiz', quizSchema)
