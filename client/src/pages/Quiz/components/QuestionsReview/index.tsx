import { useState } from 'react'


import * as Q from '../Question/styles'
import * as QR from "./styles"
import CodeMirrorEditor from '../../../../components/CodeMirrorEditor'
import { checkAmountCharsLines } from '../../../../utils/checkAmountCharsLines'
import { IAnswerSentByServer, IQuestion } from '../../../../interfaces/Quiz'
import { IAnswerPlayerQuestion } from '../../../../interfaces/Quiz/IQuizMatch'
// import CodeMirrorEditor from "../../../../components/CodeMirrorEditor";
// import { checkAmountCharsLines } from "../../../../utils/checkAmountCharsLines";

interface IPropsCreatingQuestionsReview {
  questions: IQuestion[]
  answersPlayerAlternatives: IAnswerPlayerQuestion[]
  answersServer: IAnswerSentByServer,
  onBackResults: ()=> void
}

interface IPropsQuestion {
  question: IQuestion
  current: number,
  altCorrect?: string 
  altIncorrect?: string
}

function Question({ question, current, altCorrect, altIncorrect }: IPropsQuestion) {
  return (
    <Q.Question>
      <div className="content">
        <h2>Questão 0{current + 1}</h2>
        <p className="question-paragraph">{question.question}</p>
        {question.typesComplement.blockCode.value && (
          <div className="block-code">
            <CodeMirrorEditor
              readOnly={true}
              preValue={question.typesComplement.blockCode.value}
              lang={question.typesComplement.blockCode.langMode || 'javascript'}
            />
          </div>
        )}
        <ul
          className={`alternatives ${
            checkAmountCharsLines(question.alternatives)
              ? 'flexbox-alternatives'
              : 'grid-alternatives'
          }`}
        >
          {question.alternatives.map((alternative) => (
            <li 
              key={alternative.id} 
              className={`
                alternative alt-readOnly ${
                  altCorrect === alternative.id ? "alt-correct" : 
                  altIncorrect === alternative.id ? "alt-incorrect" : ""
                }
              `}
            >
              <span>{alternative.letter}</span>
              <p>{alternative.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </Q.Question>
  )
}

export default function QuestionsReview({
  questions,
  answersPlayerAlternatives,
  answersServer,
  onBackResults
}: IPropsCreatingQuestionsReview) {
  const [current, setCurrent] = useState(0)



  const handleNavigateQuestion = (direction: "left" | "right")=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    if(direction === "left"){
        setCurrent((prevCurrent) =>(
            prevCurrent === 0 ? prevCurrent : prevCurrent - 1
        ))
    }else{
        setCurrent((prevCurrent) =>(
            prevCurrent === questions.length - 1 ? prevCurrent : prevCurrent + 1
        ))
    }
  }
  
  const verifyResponsesAlternatives = (question: IQuestion)=>{
    const responsePlayer = answersPlayerAlternatives
      .find(questR=> questR.idQuestion === question.id )

    if(!responsePlayer) throw new Error("Ocorreu um erro!")
  
    const isResponseCorrect = answersServer.answersCorrectly
      .find(questR=> questR.idQuestion === question.id)?.alternative.correct || false
    
    return {
      ...( 
        isResponseCorrect ? 
        { altCorrect: responsePlayer.idAlternative || "" } : 
        { altIncorrect: responsePlayer.idAlternative || "" } 
      )
    }
  }


  return (
    <QR.QuestionsReview>
        <div className="display-control-navigate">
          <button
              onClick={()=> handleNavigateQuestion("left")}
              className="button-navigate-questions direction-left"
          >
              <i className='bx bx-chevrons-left'></i>
          </button>
          <button 
            className="navigate-button-back" 
            onClick={onBackResults}><i className='bx bx-log-out-circle'></i></button>
          <button 
            onClick={()=> handleNavigateQuestion("right")}
            className="button-navigate-questions direction-right"
        > 
            <i className='bx bx-chevrons-right'></i>
        </button>
        </div>
        {
            <Question 
                current={current} 
                question={questions[current]} 
                { ...verifyResponsesAlternatives(questions[current]) }
              />
        }
    </QR.QuestionsReview>
  )
}
