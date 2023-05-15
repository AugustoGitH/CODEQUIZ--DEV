import { IAnswersServer } from "../../../interfaces/IQuiz"
import verifyCredentials from "../../../utils/verifyCredentials"
import { IMatchHistoryPlayer, IQuizModel } from "../../interfaces/IQuizModel"
import Quiz from "../../models/Quiz"


interface IParamsRecordMatchData {
  resolvedPlayerAnswer: IAnswersServer & { timeAverage: number },
  authToken: string
}


async function recordMatchData(
  { resolvedPlayerAnswer, authToken }: 
    IParamsRecordMatchData): Promise<IMatchHistoryPlayer | null>{

  const { isUser, idUser } = verifyCredentials(authToken, process.env.TOKEN_SECRET || "")
  const { answersCorrectly, idQuiz, timeAverage } = resolvedPlayerAnswer

  const matchHistoryModel: IMatchHistoryPlayer = {
    isUser,
    idPlayer: idUser,
    answers: answersCorrectly,
    departureDate: new Date(),
    timeAverage
  }

  try{
    await Quiz.updateOne({ _id: idQuiz }, {
      $inc: { completedMatches: 1 } as IQuizModel,
      $push: { matchHistory: matchHistoryModel },
    })
    return matchHistoryModel
  }catch(error){
    console.log(error)
    return null
  }
}


export default recordMatchData