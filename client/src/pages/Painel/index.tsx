
import * as P from './styles';


import { HISTORY_QUIZ_PRODUCTION } from '../../constants/localstorage';


import Container from '../../components/Container';
import Header from '../../components/Header';
import ListChallenges from './components/ListChallenges';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import HeaderUserConfigs from './components/HeaderUserConfigs';
import useFetchGetInfosUser from '../../queries/user/user/getInfosUser';

export default function PainelScreen() {
  const historyQuizProduction = JSON.parse(
    localStorage.getItem(HISTORY_QUIZ_PRODUCTION) || "null"
  );

  const { data: infosUser } = useFetchGetInfosUser()


  return (
    <>
      <Header painel={{ logout: true, playQuizzes: true }} />
      <Container>
        <P.PainelScreen>
          <HeaderUserConfigs
            imgProfile={infosUser?.profilePicture || ""}
          />
          <section className="apresentation-container">
            <div className="card-apresentation">
              <div className="block-code-lines">
                <p>
                  <span style={{ color:'#b80672'}}>
                    // Ótimo que você chegou até aqui! Seja muito bem-vindo ao
                    CodeQuiz!
                  </span>
                </p>
                <p>
                  <span style={{ color:'#1967d2'}}>console.log</span>
                  (<span style={{color:"#188038"}}>
                    "Olá, <span className="capitalize">{infosUser?.name || "***"}</span>! 
                  Vamos criar um desafio incrível com os seus conhecimentos?"
                  </span>)
                </p>
                <p>
                  <span style={{ color:'#1967d2'}}>console.log</span>
                  (<span style={{color:"#188038"}}>
                    "Para criar um novo desafio, clique no botão abaixo!"
                  </span>)
                </p>
              </div>
            </div>
            <nav className="nav-buttons-acess">
              <Button 
                href='/painel/create-quiz' 
                color='info' 
                hoverEffect='bd-bkg'
              >
                {
                  historyQuizProduction ? 
                  'Continuar na criação do seu desafio' :
                  'Criar um novo desafio'
                }
              </Button>
            </nav>
          </section>

          <section className="challenges-created-by">
            <div className="block-code-lines">
              <p>
                <span style={{ color:'#b80672'}}>
                  // Logo abaixo está todos os desafios criados por você! Caso
                  tenha criado um.
                </span>
              </p>
              <p>
                <span style={{color: '#1967d2'}}>console.log</span>
                (<span style={{color: "#188038"}}>
                  "Aqui você pode gerenciar seus quizes e visualizar suas estatisticas!"
                </span>)
              </p>
            </div>
            <ListChallenges />
          </section>
        </P.PainelScreen>
      </Container>
      <Footer/>
    </>
  );
}