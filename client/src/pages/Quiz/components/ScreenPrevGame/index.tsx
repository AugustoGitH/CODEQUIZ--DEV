



import { Link } from "react-router-dom";
import { IDifficultyLevel, ITechnology 
} from "../../../../interfaces/IQuiz";
import formatTime from "../../../../utils/fomatTime";

import * as S from "./styles"


interface IInfosQuiz{
    technology: ITechnology | null,
    difficulty: IDifficultyLevel | null,
    questionTime: number,
}

interface IPropsScreenPrevGame {
    infosQuiz: IInfosQuiz,
    onClickStartGame: ()=> void,
}

//  const { pathname: linkQuiz } = useLocation()






export default function ScreenPrevGame({ 
    infosQuiz, onClickStartGame }: IPropsScreenPrevGame) {

    const tratedTimeQuuestion = formatTime(infosQuiz.questionTime)

    const definedIconTech = (tech: ITechnology | null)=>{
        if(!tech) return
        if(tech === "javascript"){
            return (<i className='bx bxl-javascript'/> )
        }
        if(tech === "css"){
            return (<i className='bx bxl-css3'/> )
        }
    }

    const definedStarsDifficulty = (difficulty: IDifficultyLevel | null) =>{
        if(!difficulty) return

        interface order{
            [key: string]: number
        }

        const order: order = {
            "beginner": 1,
            "intermediary": 2,
            "avanced": 3,
            "assembly-level": 4
        }
        const setOfStars = []

        for(let i = 1; i <= Object.keys(order).length; i++){
            if(i <= order[difficulty]){
                setOfStars.push(<i key={i} className='bx bxs-star'/>)
            }else{
                setOfStars.push(<i key={i} className='bx bx-star'/>)
            }
        }
        return setOfStars

    }

  return (
    <S.ScreenPrevGame>
      <div className="card-start-game">
            <h1>
                <i className='bx bx-code'></i> 
                Bem-vindo ao nosso quiz de programação! 
                <i className='bx bx-code'></i></h1>
            <ul>
                <li>
                    <div className="infos-icon">
                        <i className='bx bxs-time'></i>
                    </div>
                    <div className="infos-description">
                        <h4>Tempo de cada questão</h4>
                        <p>{ tratedTimeQuuestion }</p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                        { definedIconTech(infosQuiz.technology) }
                    </div>
                    <div className="infos-description">
                        <h4>Tecnologia</h4>
                        <p>{ infosQuiz.technology }</p>
                    </div>
                </li>
                <li>
                    <div className="infos-icons-stars">
                        {definedStarsDifficulty(infosQuiz.difficulty)}
                    </div>
                    <div className="infos-description">
                        <h4>Dificuldade</h4>
                        <p>{ infosQuiz.difficulty }</p>
                    </div>
                </li>
                <li>
                    <div className="infos-icon">
                        <i className='bx bxs-brain icon-attr'></i>
                    </div>
                    <div className="infos-description">
                        <h4>Faça as questões <br/>
                            com atenção!</h4>
                    </div>
                </li>
            </ul>

            <nav>
                <button onClick={onClickStartGame}>
                    Vamos jogar!<i className='bx bxs-extension'></i>
                </button>
                {/* <Link to="/quizzes">
                    Escolher outro desafio
                </Link> */}
            </nav>
        </div>
    </S.ScreenPrevGame>
  )
}