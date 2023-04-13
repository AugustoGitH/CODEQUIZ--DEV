import React, {useEffect, useState } from "react";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Checkboxes from "../../components/Checkboxes";

import { IQuiz } from "../../interfaces/IQuiz";

import * as Q from "./styles";

import formatTime from "../../utils/fomatTime";


import configsCreatingQuiz from "../../settings/quiz/configs"
import LoaderSpinner from "../../components/LoaderSpinner";
import { useQuizzes } from "../../stores/listQuizzes";

function FilterQuizzes() {
  const [attrFilter, setAttrFilter] = useState({
    technology: "",
    difficulty: "",
  });
  // const { filterQuizzes } =
  //   useContext(ListQuizzesContext);

  const { filterQuizzes } = useQuizzes()


  const handleChangeButtonFilter = (attr: "technology" | "difficulty", value: string)=> {
    setAttrFilter(prevAttrs=> ({...prevAttrs, [attr]: value }))
  }
  const { options } = configsCreatingQuiz

  useEffect(()=>{
    filterQuizzes(attrFilter)
  }, [attrFilter])


  return (
    <Q.FilterQuiz>
      <div className="checkboxes-selected">
        <p>Escoha uma tecnologia:</p>
        <Checkboxes
            preValue="all"
          options={[
            {
              label: <span>Todos</span>,
              value: "all",
            },
            ...options.technology
          ]}
          onChange={value=> handleChangeButtonFilter("technology", value)}
        />
      </div>
      <div className="checkboxes-selected">
        <p>Escoha uma dificuldade:</p>
        <Checkboxes
            preValue="all"
          options={[
            {
              label: <span>Todos</span>,
              value: "all",
            },
            ...options.difficulty
          ]}
          onChange={value=> handleChangeButtonFilter("difficulty", value)}
        />
      </div>
      <hr/>
    </Q.FilterQuiz>
  );
}


function Quiz({ quiz }: { quiz: IQuiz }) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate()

  const tratedTimeQuuestion = quiz.questionTime ? formatTime(quiz.questionTime) : "***"

  const tratedDate = quiz.createdAt ? 
    moment(new Date(quiz.createdAt)).format("DD/MM/YYYY") : "***"

  return (
    <li
      className="quiz-game"
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
          <i className="bx bxl-javascript icon-tech"></i>
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
      </div>
    </li>
  );
}


function ListQuizzes() {
  const { quizzesToScreen, isFetching } = useQuizzes()

  return (
    <Q.ListQuizzes>
      <ul>
        {quizzesToScreen?.map((quiz) => (
          <Quiz quiz={quiz} key={quiz.id} />
        ))}
      </ul>
      {
        quizzesToScreen?.length === 0 ? (
          <div className="message-not-quizzes">
            <p>Nenhum quiz encontrado</p> 
          </div>
        ) : isFetching ? (
            <LoaderSpinner/>
        ) : <></>
      }
    </Q.ListQuizzes>
  );
}

export default function Quizzes() {
  return (
    <>
      <Header home={{ default: true }} />
      <Container>
        <Q.Container>
          <FilterQuizzes />
          <ListQuizzes />
        </Q.Container>
      </Container>
    </>
  );
}
