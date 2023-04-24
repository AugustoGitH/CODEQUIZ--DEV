import { IDifficultyLevel, ITechnology } from "../../../interfaces/Quiz"
import * as S from "../styles"

interface PropsInformationAboutTheQuiz {
  technology: ITechnology,
  difficulty: IDifficultyLevel,
  creationDate: string,
  questionTime: number
}

const InformationAboutTheQuiz = ({ 
  technology, 
  difficulty, 
  creationDate, 
  questionTime 
}: PropsInformationAboutTheQuiz)=>{
  return (
    <S.InformationAboutTheQuiz>
      <h2>{">"} Informações básicas do seu desafio</h2>
      <ul>
        <li>Tecnologia: {technology}</li>
        <li>Dificuldade: {difficulty}</li>
        <li>Tempo de resolução das questões: {questionTime}s</li>
        <li>Data de criação: {creationDate}</li>
      </ul>
    </S.InformationAboutTheQuiz>
  )
}

export default InformationAboutTheQuiz