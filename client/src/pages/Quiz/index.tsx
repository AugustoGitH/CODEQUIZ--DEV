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
         backToFinalResults
    } = useQuizGame(idQuiz || "")


  if (isFetching && !quiz || isGameFinished && isWaintingAnswer ) return <PageLoaded/>;
  if (!isFetching && !quiz) return <PageNotFound />;

  return (
    <>
      <Header position="sticky">
        {
          isGameStarted && !isGameFinished && quiz  && !isReviewGame  ? (
            <code style={{fontSize: "1.1rem"}}>
              <i className='bx bxs-timer' ></i>Tempo: {currentTimeQuestion}s
            </code>
          ) : <></>
        }
      </Header>
      <Container>
        {
            !isGameStarted && (
                <ScreenPrevGame 
                    infosQuiz={{
                        difficulty: quiz?.difficulty || "beginner",
                        questionTime: quiz?.questionTime || 0,
                        technology: quiz?.technology || "javascript"
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
                    issueResolutionTime = { issueResolutionTime }
                    onReviewGame = {reviewGame}
                />
            ) : <></>
        }
        {
          isReviewGame && quiz && serverAnswers ? (
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
  );
}

