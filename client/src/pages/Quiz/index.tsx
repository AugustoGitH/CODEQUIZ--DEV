/* eslint-disable max-len */
import { useParams } from "react-router-dom";

import PageNotFound from "../NotFound";

import Header from "../../components/Header";
import Container from "../../components/Container";

import useQuizGame from "../../hooks/quiz/useQuizGame";


import ScreenFinished from "./components/ScreenFinished";
import ScreenPrevGame from "./components/ScreenPrevGame";
import Question from "./components/Question";
import PageLoaded from "../../components/PageLoaded";
import QuestionsReview from "./components/QuestionsReview";





export default function PageQuiz() {
  const { id: idQuiz } = useParams();

  const { 
        startGame, 
        isGameStarted, 
        currentTimeQuestion, 
        currentQuestions,
        handleClickAlternative,
        isGameFinished,
        timeOutForQuestion,
        isWaintingAnswer,
        restartGame,
        serverAnswers,
         issueResolutionTime,
         isFetching,
         quiz,
         isReviewGame,
         reviewGame,
         playerAnswers,
         backToFinalResults,
         achievement
    } = useQuizGame(idQuiz || "")


  if (isFetching && !quiz || isGameFinished && isWaintingAnswer ) return <PageLoaded/>;
  if (!isFetching && !quiz) return <PageNotFound />;

  return quiz ? (
    <>
      <Header position="sticky">
        {
          isGameStarted && !isGameFinished && quiz  && !isReviewGame  ? (
            <p style={{
              fontSize: "1.1rem",
              display: "flex", 
              alignItems:"center", 
              gap: ".4rem"
            }}>
              <img width="20px" src="https://i.gifer.com/XVo6.gif"/>
              <i>{currentTimeQuestion}s</i>
            </p>
          ) : <></>
        }
      </Header>
      <Container>
        {
            !isGameStarted && (
                <ScreenPrevGame 
                    infosQuiz={{
                        difficulty: quiz.difficulty,
                        questionTime: quiz.questionTime || 0,
                        technology: quiz.technology
                    }} 
                    onClickStartGame={startGame}
                />
            )
        }
        {
          isGameStarted && !isGameFinished && quiz  && !isReviewGame ? (
            <Question 
              timeOver={ timeOutForQuestion } 
              onClickAlternative={ handleClickAlternative }
              current={ currentQuestions }
              question={ quiz.questions[currentQuestions] }
            />
          ) : <></>
        }
        {
            isGameFinished && serverAnswers ? (
                <ScreenFinished 
                    onRestartGame={ restartGame }
                    serverAnswers={ serverAnswers }
                    issueResolutionTime={ issueResolutionTime }
                    onReviewGame={ reviewGame }
                    achievement={ achievement }
                />
            ) : <></>
        }
        {
          isReviewGame && serverAnswers ? (
            <QuestionsReview 
              onBackResults={backToFinalResults}
              questions={quiz.questions}
              answersServer={serverAnswers}
              answersPlayerAlternatives={playerAnswers}
            />
          ) : <></>
        }

      </Container>
    </>
  ) : <></>
}

