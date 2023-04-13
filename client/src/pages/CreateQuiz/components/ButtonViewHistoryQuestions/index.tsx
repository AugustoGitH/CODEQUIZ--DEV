import React, {useEffect, useRef, useState } from 'react';

import { useCreatingQuiz } from "../../../../stores/creatingQuiz"

import AceEditor from '../../../../components/AceEditor';


import * as V from './styles';

import { IQuestion, IAlternative, ITechnology } from "../../../../interfaces/IQuiz"
import { checkAmountCharsLines } from '../../../../utils/checkAmountCharsLines';


interface IPropQuestion{
    question: IQuestion,
    onDelete: (id:string)=> void,
    index: number,
    modeEditor: ITechnology
}

function Question({ question, onDelete, index }: IPropQuestion) {
  
  const Alternative = ({ alternative }: { alternative: IAlternative}) => {
    return (
      <li className={alternative.correct ? 'alt-correct' : ''}>
        <span className="letter-alt">{alternative.letter}</span>
        {alternative.value}
      </li>
    );
  };


  return (
    <li className="question">
      <button
        onClick={() => setTimeout(() => onDelete(question.id), 100)}
        className="button-delete-question"
      >
        <i className="bx bx-x"></i>
      </button>
      <p>{`${index + 1}: ${question.question}`}</p>
      {question.typesComplement.blockCode.value && (
        <div className="block-editor">
          <AceEditor 
            disabled 
            preValue={question.typesComplement.blockCode.value} 
            mode={question.typesComplement.blockCode.langMode} 
            fontSize='small'
          />
        </div>
      )}
      <ul
        className={`alternatives ${
          checkAmountCharsLines(question.alternatives)
            ? 'flex-full-alts'
            : 'grid-alts'
        }`}
      >
        {question.alternatives.map((alternative, index) => (
          <Alternative alternative={alternative} key={index} />
        ))}
      </ul>
    </li>
  );
}



export default function ButtonViewHistoryQuestions() {
  const [showHistory, setShowHistory] = useState(false);
  const { questionsProducted, deleteQuestionQuiz, quizProducted } = useCreatingQuiz();

  const historyPopUpRef = useRef<HTMLDivElement | null>(null);
  const buttonOpenPopUpHistoryRef = useRef(null);

  useEffect(() => {

    const handleClickOutsidePopUp = (event: MouseEvent) => {
      if (
        historyPopUpRef.current &&
        !historyPopUpRef.current.contains(event.target as Node) &&
        event.target !== buttonOpenPopUpHistoryRef.current
      ) {
        setShowHistory(false);
      }
    };
    if (showHistory)
      document.addEventListener('click', handleClickOutsidePopUp);

    return () => document.removeEventListener('click', handleClickOutsidePopUp);
  }, [showHistory]);

  return (
    <V.Container>
      <V.ButtonView
        ref={buttonOpenPopUpHistoryRef}
        onClick={() => setShowHistory((prevShowH) => !prevShowH)}
      >
        <span className="quantity-questions">{questionsProducted.length}</span>{' '}
        <i className="bx bxs-message-square-detail" />
      </V.ButtonView>

      {showHistory && (
        <V.PopUpHistoryQuestions ref={historyPopUpRef}>
          {questionsProducted.length === 0 ? (
            <h2>
              <span>return</span> Não há nenhuma questão em seu quiz
            </h2>
          ) : (
            <>
              <h2>
                <span>return</span> Questões já criadas para o seu quiz
              </h2>
              <V.ListQuestionsHistory>
                {
                  questionsProducted?.map((question, index) => (
                    <Question
                      question={question}
                      modeEditor={quizProducted.technology}
                      key={index}
                      index={index}
                      onDelete={deleteQuestionQuiz}
                    />
                  ))
                }
              </V.ListQuestionsHistory>
            </>
          )}
        </V.PopUpHistoryQuestions>
      )}
    </V.Container>
  );
}
