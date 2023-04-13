/* eslint-disable max-len */
import * as S from "./styles";
import { Link } from "react-router-dom";
import { IAnswersServer, IIssueResolutionTime } from "../../../../interfaces/IQuiz";


interface IPropsScreenFinished {
  onRestartGame: ()=> void,
  onReviewGame: ()=> void
  serverAnswers: IAnswersServer,
  issueResolutionTime: IIssueResolutionTime[]
}

export default function ScreenFinished({
  onRestartGame,
  serverAnswers,
  issueResolutionTime,
  onReviewGame
}: IPropsScreenFinished) {


  const matchData = {
    sumOfResolutionTimes: issueResolutionTime
    .map(issueR=> issueR.timeInSeconds).reduce((prev, current)=> current + prev),

    amountOfQuestions: serverAnswers.answersCorrectly.length,

    averageResolutionTime(){
      return Math.floor(this.sumOfResolutionTimes / this.amountOfQuestions)
    },

    numberOfNullResponses: serverAnswers.answersCorrectly
    .filter(question=> question.alternative.id === null).length,

    amountOfHits: serverAnswers.answersCorrectly
    .filter(question=> question.alternative.correct).length,
    
    hitPercentage(){
      return Math.floor(((this.amountOfHits * 100) / this.amountOfQuestions)) + "%"
    }
  } 



  
  return (
      <S.ScreenFinished>
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
                        <p>{ matchData.numberOfNullResponses } questões</p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                            {matchData.hitPercentage()}
                    </div>
                    <div className="infos-description">
                        <h4>De acertos</h4>
                        <p>
                          {`
                            Você acertou ${matchData.amountOfHits} de ${matchData.amountOfQuestions} questões
                          `}
                        </p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                      <i className='bx bx-revision'></i>
                    </div>
                    <div className="infos-description">
                        <h4>Revise suas respostas</h4>
                        <button onClick={onReviewGame}>revise</button>
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
