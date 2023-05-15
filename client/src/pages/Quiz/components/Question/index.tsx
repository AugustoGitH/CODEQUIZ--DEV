
import { useRef } from "react";






import * as Q from "./styles"
import CodeMirrorEditor from "../../../../components/CodeMirrorEditor";
import { checkAmountCharsLines } from "../../../../utils/checkAmountCharsLines";
import { IQuestion } from "../../../../interfaces/Quiz";
import { IAnswerPlayerQuestion } from "../../../../interfaces/Quiz/IQuizMatch";

interface IPropsCreatingQuestion{
    onClickAlternative: (response: IAnswerPlayerQuestion)=> void,
    timeOver: boolean,
    current: number,
    question: IQuestion,
}


export default function Question({ 
     onClickAlternative, timeOver, current, question 
    }: IPropsCreatingQuestion){

    const refQuestion = useRef<HTMLDivElement>(null)


    return (
        <Q.Question>
            <div ref={refQuestion} className="content">
                <h2>Questão 0{current + 1}</h2>
                <p className="question-paragraph">{ question.question }</p>
               
                {
                    question.typesComplement.blockCode.value && (
                        <div className="block-code">
                            <CodeMirrorEditor 
                                readOnly={true}
                                preValue={question.typesComplement.blockCode.value}
                                lang={
                                    question.typesComplement.blockCode.langMode || 
                                    "javascript"
                                }
                            />
                        </div>
                    )
                }
                <ul className={`alternatives ${
                    checkAmountCharsLines(question.alternatives || null) ? 
                    "flexbox-alternatives" : "grid-alternatives"
                } ${timeOver ? "locked-alternatives" : ""}`}>
                    {
                        question.alternatives.map((alternative, index)=>(
                            <li 
                                className="alternative"
                                key={alternative.id}
                                onClick={()=> {
                                    onClickAlternative({ 
                                        idAlternative: alternative.id,
                                        idQuestion: question.id
                                    })
                                }}
                            >
                                <span>{ "ABCD"[index] }</span>
                                <p>{ alternative.value }</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            
        </Q.Question>
    )
}
