import { useEffect, useState } from 'react'

import {
  IAchievementSentByServer,
  IAnswerSentByServer,
  IQuestion,
  IQuizSentToCustomer,
} from '../../interfaces/Quiz'
import {
  IAnswerPlayerQuestion,
  IIssueResolutionTime,
} from '../../interfaces/Quiz/IQuizMatch'
import useFetchQuiz from '../../queries/quiz/public/quiz'
import quizServices from '../../services/public/Quiz'
import configsCreatingQuiz from '../../settings/quiz/configs'

const useGame = (quiz: IQuizSentToCustomer | undefined) => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [isReviewGame, setIsReviewGame] = useState(false)

  const [currentQuestions, setCurrentQuestions] = useState(0)
  const [currentTimeQuestion, setCurrentTimeQuestion] = useState(0)
  const [timeOutForQuestion, setTimeOutForQuestion] = useState(false)

  const [playerAnswers, setPlayerAnswers] = useState<IAnswerPlayerQuestion[]>(
    []
  )

  const [serverAnswers, setServerAnswers] =
    useState<IAnswerSentByServer | null>(null)
  const [achievement, setAchievement] =
    useState<IAchievementSentByServer | null>(null)

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
          timeAverage:
            issueResolutionTime
              .map((issue) => issue.timeInSeconds)
              .reduce((accVl, currVl) => currVl + accVl) /
            issueResolutionTime.length,
        })
        .then((response) => {
          if (!response.answers) return alert(response.message)
          setIsWaintingAnswer(false)
          setServerAnswers(response.answers)
          setAchievement(response.achievement)
        })
    }
  }, [playerAnswers])

  // Capturar respostas de questões não respondidas ( Quando o tempo acaba )
  const captureLostAnswer = (question: IQuestion | null) => {
    if (!question || !timeToAskQuestions) return

    const lostResponse: IAnswerPlayerQuestion = {
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
  const alternativeAnswered = (responseAlternative: IAnswerPlayerQuestion) => {
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
    messUpQuestions()
    setCurrentTimeQuestion(timeToAskQuestions)
    setIsGameStarted(true)
    setCurrentQuestions(0)
    rotateQuestionTime()
  }

  // Reinicializar o game
  const restartGame = () => {
    messUpQuestions()
    setIssueResolutionTime([])
    setPlayerAnswers([])
    setServerAnswers(null)
    setIsReviewGame(false)
    setIsGameFinished(false)
    setCurrentTimeQuestion(timeToAskQuestions)
    rotateQuestionTime()
    setTimeOutForQuestion(false)
  }

  const reviewGame = () => {
    setIsReviewGame(true)
    setIsGameFinished(false)
  }

  const backToFinalResults = () => {
    setIsReviewGame(false)
    setIsGameFinished(true)
  }

  // Trabalhar no clique da alternativa
  const handleClickAlternative = (
    responseAlternative: IAnswerPlayerQuestion
  ) => {
    alternativeAnswered(responseAlternative)
  }

  const messUpQuestions = () => {
    if (!quiz) return
    const { questions } = quiz

    questions.sort((question) => {
      question.alternatives.sort(() => Math.random() - 0.5)
      return Math.random() - 0.5
    })
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
    backToFinalResults,
    achievement,
  }
}

const useQuizGame = (idQuiz: string) => {
  const { data: quiz, isFetching } = useFetchQuiz(idQuiz)

  return { quiz, isFetching, ...useGame(quiz) }
}

export default useQuizGame
