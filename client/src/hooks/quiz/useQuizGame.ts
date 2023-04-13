import { useEffect, useState } from 'react'

import {
  IQuestion,
  IQuiz,
  IAnswersPlayerAlternative,
  IAnswersServer,
  IIssueResolutionTime,
} from '../../interfaces/IQuiz'

import configsCreatingQuiz from '../../settings/quiz/configs'

import quizServices from '../../services/public/Quiz'
import useFetchQuiz from '../../queries/quiz'


const useGame = (quiz: IQuiz | undefined) => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [isReviewGame, setIsReviewGame] = useState(false)

  const [currentQuestions, setCurrentQuestions] = useState(0)
  const [currentTimeQuestion, setCurrentTimeQuestion] = useState(0)
  const [timeOutForQuestion, setTimeOutForQuestion] = useState(false)

  const [playerAnswers, setPlayerAnswers] = useState<
    IAnswersPlayerAlternative[]
  >([])

  const [serverAnswers, setServerAnswers] = useState<IAnswersServer | null>(null)
  const [isWaintingAnswer, setIsWaintingAnswer] = useState<boolean | null>(null)

  // eslint-disable-next-line max-len
  const [issueResolutionTime, setIssueResolutionTime] = useState<
    IIssueResolutionTime[] | []
  >([])


  const { limitedQuestions } = configsCreatingQuiz
  const timeToAskQuestions = quiz?.questionTime || 0
  const quantityQuestions = quiz?.questions.length || limitedQuestions
 

  // Verificar se ao trocar a questão por tempo perdido, o jogo possa ter
  // chegado ao final
  useEffect(() => {
    if (timeOutForQuestion && !isGameFinished) {
      captureLostAnswer(quiz?.questions[currentQuestions] || null)
      setTimeOutForQuestion(true)
      if (quantityQuestions && currentQuestions === quantityQuestions - 1) {
        gameFinished()
      } else {
        moveNextQuestion()
        rotateQuestionTime()
      }
    }
  }, [timeOutForQuestion])

  // Mover o scroll para o topo toda a vez que trocar de questão
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [currentQuestions])

  // Mandar a resposta do jogador para o servidor e verificar suas respostas
  useEffect(() => {
    if (quiz && isGameFinished && playerAnswers.length === limitedQuestions) {
      setIsWaintingAnswer(true)
      quizServices
        .checkAnswers({
          idQuiz: quiz.id,
          answers: playerAnswers,
        })
        .then((response) => {
          if (!response.answers) return alert(response.message)
          setIsWaintingAnswer(false)
          setServerAnswers(response.answers)
        })
    }
  }, [playerAnswers])

  // Capturar respostas de questões não respondidas ( Quando o tempo acaba )
  const captureLostAnswer = (question: IQuestion | null) => {
    if (!question || !timeToAskQuestions) return

    const lostResponse: IAnswersPlayerAlternative = {
      idAlternative: null,
      idQuestion: question.id,
    }
    setPlayerAnswers((prevResponses) => [...prevResponses, lostResponse])
    setIssueResolutionTime((prevTimes) => [
      ...prevTimes,
      {
        id: question.id,
        timeInSeconds: timeToAskQuestions - (currentTimeQuestion || 0),
      },
    ])
  }

  // Rodar o cronometro para a resolução das questões
  const rotateQuestionTime = () => {
    const currentTime = setInterval(() => {
      setCurrentTimeQuestion((prevTime) => {
        if (prevTime === 0) {
          clearInterval(currentTime)
          setTimeOutForQuestion(true)
        }
        return prevTime ? prevTime - 1 : prevTime
      })
    }, 1000)
  }

  // Quando o game e finalizado
  const gameFinished = () => {
    setIsGameFinished(true)
    setCurrentTimeQuestion(0)
    setCurrentQuestions(0)
  }

  // Quando a alternativa é clicada e a questão é respondida
  const alternativeAnswered = (
    responseAlternative: IAnswersPlayerAlternative
  ) => {
    setPlayerAnswers((preResponses) => [...preResponses, responseAlternative])
    setIssueResolutionTime((prevTimes) => [
      ...prevTimes,
      {
        id: responseAlternative.idQuestion,
        timeInSeconds: timeToAskQuestions - (currentTimeQuestion || 0),
      },
    ])

    if (quantityQuestions && currentQuestions === quantityQuestions - 1) {
      gameFinished()
    } else {
      moveNextQuestion()
    }
  }

  // Passar para a proxima questão
  const moveNextQuestion = () => {
    setTimeOutForQuestion(false)
    setCurrentQuestions((prevCurrent) => prevCurrent + 1)
    setCurrentTimeQuestion(timeToAskQuestions)
  }

  // Inicializar o game
  const startGame = () => {
    setCurrentTimeQuestion(timeToAskQuestions)
    setIsGameStarted(true)
    setCurrentQuestions(0)
    rotateQuestionTime()
  }

  // Reinicializar o game
  const restartGame = () => {
    setIssueResolutionTime([])
    setPlayerAnswers([])
    setServerAnswers(null)
    setIsReviewGame(false)
    setIsGameFinished(false)
    setCurrentTimeQuestion(timeToAskQuestions)
    rotateQuestionTime()
    setTimeOutForQuestion(false)
  }

  const reviewGame = ()=>{
    setIsReviewGame(true)
    setIsGameFinished(false)
  }

  const backToFinalResults = ()=>{
    setIsReviewGame(false)
    setIsGameFinished(true)
  }

  // Trabalhar no clique da alternativa
  const handleClickAlternative = (
    responseAlternative: IAnswersPlayerAlternative
  ) => {
    alternativeAnswered(responseAlternative)
  }

  return {
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
    reviewGame,
    isReviewGame,
    playerAnswers,   
    backToFinalResults
  }
}


const useQuizGame = (idQuiz: string)=>{
  const { data: quiz, isFetching } = useFetchQuiz(idQuiz)

  return { quiz, isFetching, ...useGame(quiz) }
}

export default useQuizGame