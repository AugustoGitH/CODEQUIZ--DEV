
import { useParams } from "react-router-dom"

import moment from "moment"

import Container from "../../components/Container"
import Header from "../../components/Header"
import PageLoaded from "../../components/PageLoaded"
import useFetchUserCreatedQuiz from "../../queries/quiz/user/quiz"
import ControllersEditQuiz from "./components/ControllersEditQuiz"
import InformationAboutTheQuiz from "./components/InformationAboutTheQuiz"
import * as S from "./styles"


const UserCreatedQuiz = () => {
  const { id: idQuiz } = useParams()
  const { data: quiz, isFetching } = useFetchUserCreatedQuiz(idQuiz || "")

  if (isFetching && !quiz) return (<PageLoaded />)
  return (
    <>
      <Header painel={{ playQuizzes: true, back: true }} />
      <Container>
        <S.UserCreatedQuiz>
          <div className="block-code-lines">
            <p>
              <span style={{ color: '#b80672' }}>
                    //  Vamos dar uma olhada afundo no seu desafio!
              </span>
            </p>
            <p>
              <span style={{ color: '#1967d2' }}>console.log</span>
              (<span style={{ color: "#188038" }}>
                "Olá, <span className="capitalize"></span>!
                Vamos criar um desafio incrível com os seus conhecimentos?"
              </span>)
            </p>
            <p>
              <span style={{ color: '#1967d2' }}>console.log</span>
              (<span style={{ color: "#188038" }}>
                "Para criar um novo desafio, clique no botão abaixo!"
              </span>)
            </p>
          </div>

          {
            quiz && (
              <>
                <InformationAboutTheQuiz
                  creationDate={moment(new Date(quiz.createdAt)).format("DD/MM/YYYY")}
                  difficulty={quiz.difficulty}
                  technology={quiz.technology}
                  questionTime={quiz.questionTime}
                />
                <ControllersEditQuiz quizId={quiz.id} />
              </>
            )
          }
        </S.UserCreatedQuiz>
      </Container>
    </>
  )
}

export default UserCreatedQuiz