
import { useNavigate } from "react-router-dom";
import generateId from '../../../../../utils/generateID';
import { IQuizSentToCustomer } from "../../../../../interfaces/Quiz";
import moment from "moment";


interface IPropsPropQuizObject {
  prop: string,
  value: string
}

const PropQuizObject = ({ prop, value }: IPropsPropQuizObject)=>{
  return (
    <span className="line-code-span" style={{ paddingLeft: '5rem' }}>
      <span style={{ color: '#77b7d7' }}>{prop}: </span>{' '}
      <span style={{ color: '#a7ff4a' }}>"{value}"</span>
    </span>
  )
}


const Quiz = ({ quiz }: { quiz: IQuizSentToCustomer })=>{
  const navigate = useNavigate()

  const tratedDate = quiz.createdAt ? 
    moment(new Date(quiz.createdAt)).format("DD/MM/YYYY") : "***"

  return (
    <li>
      <article className="header-challenge">
        <span className="line-code-span">
          <span style={{ color: '#77b7d7' }}>const </span>{' '}
          <span style={{ color: '#86d9ca' }}>quiz</span>
          {' = {'}
        </span>
        <PropQuizObject prop="id" value={generateId(6)}/>
        <PropQuizObject prop="tecnologia" value={quiz.technology}/>
        <PropQuizObject prop="nivel" value={quiz.difficulty}/>
        <PropQuizObject prop="criação" value={tratedDate}/>
        <span className="line-code-span">{'}'}</span>
      </article>
      <button 
        className="button-open-quiz" 
        onClick={()=> navigate(`/painel/quizzes/${quiz.id}`)}
      >
        <span style={{ color: '#86d9ca' }}>openQuiz</span>({'{'}
        <span style={{ color: '#77b7d7' }}> idQuiz:</span>
        <span style={{ color: '#fff' }}> quiz.id</span>
        {'}'}) 
      </button>
    </li>
  );
}

export default Quiz