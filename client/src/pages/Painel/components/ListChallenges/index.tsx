
import generateId from '../../../../utils/generateID';


import * as L from './styles';
import { Link } from "react-router-dom";

import { HISTORY_QUIZ_PRODUCTION } from "../../../../constants/localstorage"
import LoaderSpinner from "../../../../components/LoaderSpinner";
import useFetchUserCreatedQuizzes from "../../../../queries/userCreatedQuizzes";

interface IPropsChallenge {
    technology: string,
    difficulty: string,
    id: string
}


function Challenge({ challenge }: { challenge: IPropsChallenge }) {
  return (
    <li>
      <article className="header-challenge">
        <span className="line-code-span">
          <span style={{ color: '#77b7d7' }}>const </span>{' '}
          <span style={{ color: '#86d9ca' }}>quiz</span>
          {' = {'}
        </span>
        <span className="line-code-span" style={{ paddingLeft: '5rem' }}>
          <span style={{ color: '#77b7d7' }}>id: </span>{' '}
          <span style={{ color: '#a7ff4a' }}>"{generateId(6)}"</span>
        </span>
        <span className="line-code-span" style={{ paddingLeft: '5rem' }}>
          <span style={{ color: '#77b7d7' }}>tecnologia: </span>{' '}
          <span style={{ color: '#a7ff4a' }}>
            "{challenge.technology}"
          </span>
        </span>
        <span className="line-code-span" style={{ paddingLeft: '5rem' }}>
          <span style={{ color: '#77b7d7' }}>nivel: </span>
          <span style={{ color: '#a7ff4a' }}>
            "{challenge.difficulty}"
          </span>
        </span>
        <span className="line-code-span">{'}'}</span>
      </article>
      <button className="button-open-quiz">
        <span style={{ color: '#86d9ca' }}>startQuiz</span>({'{'}
        <span style={{ color: '#77b7d7' }}> idQuiz:</span>
        <span style={{ color: '#fff' }}> quiz.id</span>
        {'}'}) 
      </button>
    </li>
  );
}


export default function ListChallenges() {
  const historyQuizLocalStorage = JSON.parse(
    localStorage.getItem(HISTORY_QUIZ_PRODUCTION) || "null"
  )

  const { data: quizzes, isFetching } = useFetchUserCreatedQuizzes()

  const quizesByCreated = quizzes?.map(quiz=> (
    <Challenge challenge={quiz} key={quiz.id}/>
  )) 
  
  return (
    <L.ListChallenges>
        { quizzes && quizzes.length === 0 ? (
          <p className="not-challenges-message">
            Você ainda não criou nenhum desafio!
            <Link to="/painel/create-quiz">
              {
              historyQuizLocalStorage ? "Continuar na criação do seu desafio":
                "Criar um novo desafio"
              }
            </Link>
          </p>
        ) : isFetching && !quizzes ? (
          <div className="loading-quizzes">
            <LoaderSpinner/>
          </div>
        ) : <></>
      }
      { quizesByCreated }
    </L.ListChallenges>
  );
}
