import { useNavigate } from "react-router-dom";
import { IQuizSentToCustomer } from "../../../interfaces/Quiz";
import formatTime from "../../../utils/fomatTime";
import moment from "moment";
import { useState } from "react";

import * as S from "../styles"




function CardQuiz({ quiz }: { quiz: IQuizSentToCustomer }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate()

  const tratedTimeQuuestion = quiz.questionTime ? formatTime(quiz.questionTime) : "***"

  const tratedDate = quiz.createdAt ? 
    moment(new Date(quiz.createdAt)).format("DD/MM/YYYY") : "***"

  return (
    <S.CardQuiz
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={()=> navigate(`/quizzes/${quiz.id}`)}
    >
      <div className="cover">
        {isHover ? (
          <button className="button-play-quiz">
            <i className='bx bxl-play-store'></i>
          </button>
        ) : (
          <i className={`bx bxl-${
            quiz.technology === "javascript" ? "javascript" :
            quiz.technology === "css" ? "css3" : 
            quiz.technology === "html" ? "html5" : ""
          } icon-tech`
          }></i>
        )}
      </div>
      <div className="description">
        <ul className="quiz-tags">
          <li>{ quiz.technology }</li>
          <li>{ quiz.difficulty }</li>
        </ul>
        <span className="display-time">
            Tempo: {tratedTimeQuuestion}
        </span>
        <span className="display-data">Data de criação: { tratedDate } </span>
        <div className="profile-creator">
          <img src={quiz.creator?.profileImg || ""}/>
          <span><i>Criado por {quiz.creator?.name || "?"}</i></span>
        </div>
      </div>
    </S.CardQuiz>
  );
}

export default CardQuiz