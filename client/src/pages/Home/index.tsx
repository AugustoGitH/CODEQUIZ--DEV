/* eslint-disable max-len */
import React, { useState } from "react"
import Header from "../../components/Header"
import AceEditor from "../../components/AceEditor"

import * as H from './styles';


import Button from "../../components/Button";
import Footer from "../../components/Footer";

const Home = ()=>{
    const [showButton, setShowButton] = useState(false);

    return (
        <>
            <Header home={{default: true}} position="sticky"/>
            <H.Apresentation>
                    <div className="ace-editor-block">
                        <AceEditor
                            preValue={
                                ' // Apresentação do CodeQuiz\n\n\nalert("Opa, e aí?")\n\nconst responsta = prompt("Tá preparado para colocar seus conhecimentos de programação a prova?")\n\nif(resposta === "sim"){\n\n    alert("Então se prepare, porque você acaba de chegar no Codequiz!")\n    alert("Aqui você pode criar os seus próprios desafios e compartilhar para seus colegas programadores.")\n    alert("Então bora lá, mostrar quem é o rei ou a rainha dos programadores! Vamos nessa?")\n\n    document.body.querySelector("nav").innerHTML = `\n        <a href="auth/register">Vou me registrar</a>\n        <a href="auth/login">Já possuo minha conta</a>\n  `\n}\n'
                              }
                            disabled
                            finallyType={() => setShowButton(true)}
                            fontSize="small"
                        />
                    </div>
                    <nav>
                        {showButton && (
                        <>
                            <Button color="dark" href="/auth/register" size="small">
                                Vou me registrar
                            </Button>
                            <Button color="info" href="/auth/login" size="small">
                                Já possuo minha conta
                            </Button>
                        </>
                        )}
                    </nav>
                </H.Apresentation>
                <H.StartGame>
                    <div className="content">
                        <div className="title">
                            <h1>Teste seus conhecimentos de <span>programação</span> agora mesmo!<br/>Participe de varios <span>quizzes</span> e divirta-se enquanto aprende.</h1>
                            <p>Jogar é fácil e rápido! Não precisa se cadastrar. Escolha o desafio e divirta-se sem complicações.</p>
                        </div>
                        <Button href="/quizzes" color="info" hoverEffect="bd-bkg">
                            Escolher Desafio
                        </Button>
                    </div>
                    <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                </H.StartGame>
        </>
    )
}

export default Home