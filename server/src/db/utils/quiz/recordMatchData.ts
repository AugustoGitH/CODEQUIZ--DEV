import { IAnswersServer } from "../../../interfaces/IQuiz"
import verifyCredentials from "../../../utils/verifyCredentials"
import { IQuizModel } from "../../interfaces/IQuizModel"
import Quiz from "../../models/Quiz"


interface IParamsRecordMatchData {
  resolvedPlayerAnswer: IAnswersServer,
  authToken: string
}


async function recordMatchData(
  { resolvedPlayerAnswer, authToken }: IParamsRecordMatchData){
  const { isUser, idUser } = verifyCredentials(authToken, process.env.TOKEN_SECRET || "")
  const { answersCorrectly, idQuiz } = resolvedPlayerAnswer
  try{
    await Quiz.updateOne({ _id: idQuiz }, {
      $inc: {
        completedMatches: 1
      } as IQuizModel,
      $push: {
        matchHistory: {
          isUser,
          idPlayer: idUser,
          answers: answersCorrectly
        }
      },
    })
  }catch(error){
    console.log(error)
    throw new Error("Erro interno do servidor ao capturar resposta do player.")
  }
}


export default recordMatchData