/* eslint-disable max-len */
import { IMatchHistoryPlayer, IQuizModel } from "../../db/interfaces/IQuizModel"
import User from "../../db/models/User"
import { IAchievementSentByServer, IAnswerServerQuestion, IDifficultyLevel, ITechnology } from "../../interfaces/IQuiz"
import settingsUser from "../../settings/user"







interface IParamsCheckForRecentMatches{
  currentMatch: IMatchHistoryPlayer,
  historyMatch: IMatchHistoryPlayer[]
}
const checkForRecentMatches = ({
  currentMatch, historyMatch
}: IParamsCheckForRecentMatches): boolean =>{
  const checkLimitPassed = (departureDate: Date): boolean=>{
    const currentDate = new Date()
    const diffEmMs = Math.abs(currentDate.getTime() - departureDate.getTime())
    const diffEmHrs = Math.floor(diffEmMs / 3600000)
    return diffEmHrs <= settingsUser.hoursToGetAchievement
  }
  const recentMatches = historyMatch.filter(histy=>(
    histy.idPlayer === currentMatch.idPlayer && checkLimitPassed(histy.departureDate)
  ))
  return recentMatches.length > 0
}





interface IParamsSelectAchievements{
  percentageOfHits: number,
  difficulty: IDifficultyLevel,
  technology: ITechnology,
  startingPercentGlobal: number
} 

interface achievementSelected{
  name: string,
  type: "trofeu" | "medal",
  condition: boolean,
  message: string
}

const selectAchievements = ({ percentageOfHits, difficulty, technology, startingPercentGlobal }: IParamsSelectAchievements):  IAchievementSentByServer[] =>{
  const difficulties: IDifficultyLevel[] = ["assembly-level", "avanced", "beginner", "intermediary"]
  const technologies: ITechnology[] = ["css", "html", "javascript"]


  const achievementsModels = technologies.map(tech=>{
    const techName = (
      tech === "css" ? "CSS" : 
      tech === "html" ? "HTML" : 
      tech === "javascript" ? "JavaScript" : 
      ""
    )
    return difficulties.map(diff=>{
      const difficultyName = (
        diff === "assembly-level" ? "assembly" : 
        diff === "avanced" ? "avançado" : 
        diff === "beginner" ? "iniciante" : 
        diff === "intermediary" ? "intermediário" : 
        ""
      )

      if(startingPercentGlobal <= 30 && startingPercentGlobal > 0) return {
        name: `${tech}-${diff}-100-rank-30`,
        type: "trofeu", 
        condition: percentageOfHits === 100 && difficulty === diff && technology === tech ,
        message: `Uau! Você não apenas obteve 100% de acertos no quiz de ${techName} nível ${difficultyName}, mas também possui uma das melhores média de tempo entre os participantes. \n Com certeza, você merece um troféu por essa conquista incrível, não é mesmo?`
      } as achievementSelected

      if(startingPercentGlobal === 0) return {
        name: `${tech}-${diff}-100-the-better`,
        type: "trofeu",
        condition: percentageOfHits === 100 && difficulty === diff && technology === tech ,
        message: `Uau! Você não apenas obteve 100% de acertos no quiz de ${techName} nível ${difficultyName}, mas também teve a menor média de tempo entre os participantes. \n Com certeza, você merece um troféu por essa conquista incrível, não é mesmo?`
      } as achievementSelected

      return {
        name: `${tech}-${diff}-100`,
        type: "medal",
        condition: percentageOfHits === 100 && difficulty === diff && technology === tech ,
        message: `Parabéns pela sua conquista em obter 100% de acertos no quiz de ${techName} nível ${difficultyName}! \n Com certeza, esse feito merece uma medalha, não é mesmo?`
      } as achievementSelected
    })
  })

  const achievements = [
    ...achievementsModels.flat()
  ]
  const achievementSelected = achievements.filter(achiev=> achiev.condition)

  return achievementSelected
}


const calculatePercentHits = (answersServerQuestion: IAnswerServerQuestion[]): number=> {
  return Math.floor(
    (answersServerQuestion.filter(answer=> answer.alternative.correct).length * 100 ) / answersServerQuestion.length
  )
}


interface IParamsCalculatePercentageGlobalMatches{
  currentMatch: IMatchHistoryPlayer,
  historyMatch: IMatchHistoryPlayer[]
}
const calculatePercentageGlobalMatches = ({ currentMatch, historyMatch }: IParamsCalculatePercentageGlobalMatches)=>{
  // console.log(currentMatch)
  const matches100percentAccuracy = historyMatch.filter(match=> calculatePercentHits(match.answers) === 100)

  const totalMatches100percent = [...matches100percentAccuracy, currentMatch]
  
  if(totalMatches100percent.length < 10) return 100

  const matchesOrganizedAveregeTime = totalMatches100percent.sort((a, b)=> a.timeAverage - b.timeAverage)
  const recentMatchPosition = matchesOrganizedAveregeTime.map(match=> match.timeAverage).indexOf(currentMatch.timeAverage)
  const percentCurrentMatch = Math.round((recentMatchPosition * 100) / matchesOrganizedAveregeTime.length)

  return percentCurrentMatch
} 





interface IParamsTratedMatch{
  currentMatch: IMatchHistoryPlayer | null,
  quiz: IQuizModel
}
async function checkAndSaveUserGame({
  currentMatch, quiz
}: IParamsTratedMatch): Promise<IAchievementSentByServer | null>{
  if(
    !currentMatch || 
    !currentMatch.idPlayer || 
    calculatePercentHits(currentMatch.answers) !== 100
  ) return null 

  if(checkForRecentMatches({
    currentMatch,
    historyMatch: quiz.matchHistory
  })) return null

  const achievementsSelected: IAchievementSentByServer[] = selectAchievements({
    difficulty: quiz.difficulty,
    technology: quiz.technology,
    percentageOfHits: calculatePercentHits(currentMatch.answers),
    startingPercentGlobal: calculatePercentageGlobalMatches({
      currentMatch,
      historyMatch: quiz.matchHistory
    })
  })

  if(achievementsSelected.length === 0) return null
  try{
    const player = await User.findById(currentMatch.idPlayer)
    if(!player) throw new Error("Usuário não foi encontrado!")
    
    const achievementSelected = achievementsSelected.find(archivSelected=>(
      !player.achievements.includes(archivSelected.name)
    )) || null
    
    if(!achievementSelected) return null
    
    await User.updateOne({_id: currentMatch.idPlayer }, {
      $push: { achievements: achievementSelected.name }
    })
    
    return achievementSelected
  }catch(error){
    console.log(error)
    return null
  }
  
}




export default checkAndSaveUserGame