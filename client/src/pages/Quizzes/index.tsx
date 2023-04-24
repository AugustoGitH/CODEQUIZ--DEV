import React, {useEffect, useState } from "react";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Checkboxes from "../../components/Checkboxes";

import * as Q from "./styles";



import configsCreatingQuiz from "../../settings/quiz/configs"
import LoaderSpinner from "../../components/LoaderSpinner";
import { useQuizzes } from "../../stores/listQuizzes";
import Footer from "../../components/Footer";
import CardQuiz from "./components/CardQuiz";


function FilterQuizzes() {
  const [attrFilter, setAttrFilter] = useState({
    technology: "",
    difficulty: "",
  });
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




function ListQuizzes() {
  const { quizzesToScreen, isFetching } = useQuizzes()
  return (
    <Q.ListQuizzes>
      <ul>
        {quizzesToScreen?.map((quiz) => (
          <CardQuiz quiz={quiz} key={quiz.id} />
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
          <div className="line-horizontal"/>
          <ListQuizzes />
        </Q.Container>
      </Container>
      <Footer/>
    </>
  );
}
