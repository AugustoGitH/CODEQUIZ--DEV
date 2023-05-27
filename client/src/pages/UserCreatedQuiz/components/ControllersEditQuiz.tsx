
import { useState } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"

import PopUpConfirm from "../../../components/PopUpConfirm"
import deleteQuizService from "../../../services/user/quiz/DeleteQuiz"
import * as S from "../styles"

interface PropsControllersEditQuiz {
  quizId: string
}

const ControllersEditQuiz = ({ quizId }: PropsControllersEditQuiz) => {
  const [showPopUpDeleteQuiz, setShowPopUpDeleteQuiz] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDeleteQuiz = () => {
    deleteQuizService(quizId).then(({ message, status }) => {
      setShowPopUpDeleteQuiz(false)
      if (status) {
        queryClient.invalidateQueries(["quizzes-public", "quizzes-by-created"])
        navigate("/painel")
      } else {
        alert(message)
      }
    })
  }

  return (
    <S.ControllersEditQuiz>
      <PopUpConfirm
        helperText="Você deseja excluir o seu quiz permanentemente?"
        show={showPopUpDeleteQuiz}
        handleClickButtons={{
          yes: handleDeleteQuiz,
          not: () => setShowPopUpDeleteQuiz(false),
        }}
      />
      <button
        className="button-delete"
        onClick={() => setShowPopUpDeleteQuiz(true)}>
        Deletar Quiz
        <i className='bx bxs-trash-alt'></i>
      </button>
    </S.ControllersEditQuiz>
  )
}


export default ControllersEditQuiz