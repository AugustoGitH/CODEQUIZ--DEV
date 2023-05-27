/* eslint-disable max-len */
import imageLogo from "../../assets/images/logo.png"
import Button from "../../components/Button";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import * as H from './styles';

const Home = () => {

    return (
        <>
            <Header home={{ default: true }} position="fixed" />
            <Container>
                <H.Apresentation>
                    <div className="techs-flooter">
                        <i className='bx bxl-react icon-react'></i>
                        <i className='bx bxl-javascript icon-js'></i>
                        <i className='bx bxl-html5 icon-html' ></i>
                        <i className='bx bxl-css3 icon-css' ></i>
                        <i className='bx bxl-nodejs icon-node' ></i>
                        <i className='bx bxl-typescript icon-type' ></i>
                    </div>
                    <img className="gif-scroll" src="https://cdn.dribbble.com/users/1459765/screenshots/3563580/scrolling_mousewheel.gif" />
                    <img className="logo" src={imageLogo} />
                    <h1>Seja muito bem-vindo!</h1>
                    <h2>
                        O <b>Codequiz</b> é uma plataforma que permite <b>criar e jogar quizzes </b>
                        sobre <b>suas tecnologias favoritas</b> enquanto se diverte e aprende. O conteúdo é sempre atualizado para manter os usuários
                        informados sobre as últimas novidades da <b>programação</b>. Comece a explorar o mundo do
                        Codequiz agora mesmo e aproveite essa oportunidade.
                    </h2>
                    <nav>
                        <Button href="/auth/login" color="info" hoverEffect="bd-bkg">
                            Já possuo minha conta
                        </Button>
                        <Button href="/auth/register" color="dark" hoverEffect="bd-bkg">
                            Desejo criar uma conta
                        </Button>
                    </nav>
                    {/* <p>
                        O Codequiz é uma plataforma que permite criar e jogar quizzes sobre tecnologias enquanto se diverte 
                        e aprende. O conteúdo é sempre atualizado para manter os usuários informados sobre as últimas 
                        novidades da programação. Comece a explorar o mundo do Codequiz agora mesmo e aproveite 
                        essa oportunidade.
                    </p> */}
                </H.Apresentation>
                <H.StartGame>
                    <div className="title">
                        <h1>Teste seus conhecimentos de <span>programação</span> agora mesmo!<br />Participe de varios <span>quizzes</span> e divirta-se enquanto aprende.</h1>
                        <p>Jogar é fácil e rápido! Não precisa se cadastrar. Escolha o desafio e divirta-se sem complicações.</p>
                    </div>
                    <Button href="/quizzes" color="info" hoverEffect="bd-bkg">
                        Escolher Desafio
                    </Button>
                </H.StartGame>
            </Container>
            <Footer />
        </>
    )
}

export default Home