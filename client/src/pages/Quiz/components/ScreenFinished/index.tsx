/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { IAchievementSentByServer, IAnswerSentByServer } from "../../../../interfaces/Quiz";
import { IIssueResolutionTime } from "../../../../interfaces/Quiz/IQuizMatch";
import * as S from "./styles";
import { Link } from "react-router-dom";

import ImageTrofeu from "../../../../assets/images/trofeu.png"
import ImageMedalha from "../../../../assets/images/medalha.png"

interface IPropsScreenFinished {
  onRestartGame: ()=> void,
  onReviewGame: ()=> void
  serverAnswers: IAnswerSentByServer,
  issueResolutionTime: IIssueResolutionTime[],
  achievement: IAchievementSentByServer | null
}

export default function ScreenFinished({
  onRestartGame,
  serverAnswers,
  issueResolutionTime,
  onReviewGame,
  achievement
}: IPropsScreenFinished) {
  const [showPopUpAchievement, setShowPopUpAchievement] = useState(false)

  const matchData = {
    sumOfResolutionTimes: issueResolutionTime
    .map(issueR=> issueR.timeInSeconds).reduce((prev, current)=> current + prev),

    amountOfQuestions: serverAnswers.answersCorrectly.length,

    averageResolutionTime(){
      return Number((this.sumOfResolutionTimes / this.amountOfQuestions).toFixed(1))
    },

    numberOfNullResponses: serverAnswers.answersCorrectly
    .filter(question=> question.alternative.id === null).length,

    amountOfHits: serverAnswers.answersCorrectly
    .filter(question=> question.alternative.correct).length,
    
    hitPercentage(){
      return Math.floor(((this.amountOfHits * 100) / this.amountOfQuestions)) + "%"
    }
  } 

  useEffect(()=>{
    if(achievement){
      setShowPopUpAchievement(true)
    }
  }, [achievement])



  
  return (
      <S.ScreenFinished>
        {
          showPopUpAchievement && achievement ? (
            <S.Achievement>
              <div className="card">
                <p>{achievement?.message}</p>
                <div className="circle-premium">
                  <img 
                    onClick={()=> setShowPopUpAchievement(false) }
                    id="trofeu-image" 
                    src={achievement.type === "medal" ? ImageMedalha : achievement.type === "trofeu" ? ImageTrofeu : ""}
                  />
                </div>
              </div>
            </S.Achievement>
          ) : <></>
        }
        <div className="card-start-game">
          <h1>
            <i className='bx bx-code-alt'></i> 
            Parabéns por finalizar o desafio!
            <i className='bx bx-code-alt'></i> 
          </h1>
          <ul>
                <li>
                    <div className="infos-icon">
                        <i className='bx bxs-time'></i>
                    </div>
                    <div className="infos-description">
                        <h4>Média de tempo</h4>
                        <p>
                          { `
                            ${matchData.averageResolutionTime()} 
                            ${
                              matchData.averageResolutionTime() === 1 ? 
                              "segundo" : "segundos"
                            }
                          `} 
                        </p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                    <i className='bx bxs-error'></i>
                    </div>
                    <div className="infos-description">
                        <h4>Questões Anuladas</h4>
                        <p>{matchData.numberOfNullResponses === 1 ? "Uma questão" : `${matchData.numberOfNullResponses} questões`} </p>
                    </div>
                </li>
                <li className="review-answer">
                    <div className="infos-icon">
                    <i className='bx bxs-pie-chart-alt-2'></i>
                    </div>
                    <div className="infos-description">
                        <h4>{matchData.hitPercentage()} de acertos</h4>
                        <p>
                          {`
                            Você acertou ${matchData.amountOfHits} de ${matchData.amountOfQuestions} questões
                          `}
                        </p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                      <button onClick={onReviewGame}><i className='bx bx-revision'></i></button>
                    </div>
                    <div className="infos-description">
                        <h4>Revise suas respostas</h4>
                        <p>Clique no botão para revisar</p>
                    </div>
                </li>
            </ul>
          <nav>
            <button onClick={onRestartGame}>
                Tentar novamente<i className='bx bx-reset'></i>
            </button>
            <Link to="/quizzes">
                Buscar outros desafios<i className='bx bxs-search-alt-2' ></i>
            </Link>
          </nav>
        </div>
    </S.ScreenFinished>
  )
}
