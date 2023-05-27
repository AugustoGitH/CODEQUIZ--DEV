import { Link } from "react-router-dom";

import LoaderSpinner from "../../../../components/LoaderSpinner";
import { HISTORY_QUIZ_PRODUCTION } from "../../../../constants/localstorage"
import useFetchUserCreatedQuizzes from "../../../../queries/quiz/user/quizzes";
import Quiz from "./components/Quiz"
import * as L from './styles';



export default function ListChallenges() {
  const historyQuizLocalStorage = JSON.parse(
    localStorage.getItem(HISTORY_QUIZ_PRODUCTION) || "null"
  )
  const { data: quizzes, isFetching } = useFetchUserCreatedQuizzes()


  return (
    <L.ListChallenges>
      {
        quizzes && quizzes.length === 0 ? (
          <p className="not-challenges-message">
            Você ainda não criou nenhum desafio!
            <Link to="/painel/create-quiz">
              {
                historyQuizLocalStorage ? "Continuar na criação do seu desafio" :
                  "Criar um novo desafio"
              }
            </Link>
          </p>
        ) : <></>
      }
      {
        quizzes?.map(quiz => <Quiz quiz={quiz} key={quiz.id} />) || []
      }
      {
        isFetching && !quizzes ? (
          <div className="loading-quizzes">
            <LoaderSpinner />
          </div>
        ) : <></>
      }
    </L.ListChallenges>
  );
}
