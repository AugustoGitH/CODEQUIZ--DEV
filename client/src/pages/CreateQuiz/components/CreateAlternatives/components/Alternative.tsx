import { IAlternative } from "../../../../../interfaces/IQuiz";

interface IPropsAlternative{
    alternative: IAlternative,
    index: number,
    alternatives: IAlternative[],
    onDelete: (id: string)=> void,
    onCorrectly: (alternative: IAlternative)=> void
}


export default function Alternative({
    alternative, index, alternatives, onDelete, onCorrectly}: IPropsAlternative){
    return ( 
        <li 
            className={alternative.correct ? "alternative-correct" : ""}
        >
          {index === alternatives.length - 1 && (
            <button
              id="button-delete-alt"
              onClick={() => onDelete(alternative.id)}
            >
              <i className="bx bx-x"></i>
            </button>
          )}
          <span className="alt-letter">{alternative.letter}</span>
          <p>{alternative.value}</p>
          <button
            onClick={() => onCorrectly(alternative)}
            className="button-defined-alt-correct"
          >
            <i className="bx bxs-like"></i>
          </button>
        </li>
    )
}