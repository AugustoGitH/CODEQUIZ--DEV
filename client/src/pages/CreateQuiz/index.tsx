import { useState, useRef } from "react";

import Container from "../../components/Container";
import Header from "../../components/Header";
import TextArea from "../../components/Textarea";
import Checkboxes from "../../components/Checkboxes";
import SupportVisualQuiz from "./components/SupportVisualQuestion";
import CreateAlternativesQuiz from "./components/CreateAlternatives";
import PopUpLoading from "../../components/PopUpLoading";
import AlertSheet from "../../components/AlertSheet";

import { useCreatingQuiz } from "../../stores/creatingQuiz"

import configs from "../../settings/quiz/configs";


import * as C from "./styles";
import ButtonViewHistoryQuestions from "./components/ButtonViewHistoryQuestions";


export default function CreateQuiz() {
  const { limitedQuestions, questionCharacterLimit } = configs;

  const [creatingQuizStatus, setCreatingQuizStatus] = useState({
    showPopUp: false,
    loading: false,
  });
  const [ isCreatingQuestion, setIsCreatingQuestion ] = useState(false);

  const { 
    addQuestion, addQuestionAttributes, addQuizAttributes,
    isResetQuestion, submitQuiz, quizProducted, questionsProducted
  } = useCreatingQuiz()

  const endPointRef = useRef<HTMLDivElement | null>(null);

  const handleAddQuestion = ()=>{
    addQuestion(()=>{
      setIsCreatingQuestion(true)
      navigateEndPoint()
    })
  }

  const handleSubmitQuiz = ()=>{
    submitQuiz({
      whenSend: ()=>{
        setCreatingQuizStatus({
          showPopUp: true,
          loading: true,
        });
      },
      whenFinishSend: ()=>{
        setCreatingQuizStatus((prevCreating) => ({
          ...prevCreating,
          loading: false,
        }));
      },
      whenHaveError: message=>{
        setCreatingQuizStatus({ loading: false, showPopUp: false });
        setTimeout(() => alert(message), 1000);
      },
    })
  }

  const navigateEndPoint = () => {
    if (!endPointRef.current) return;
    const positionInitialCreatedQuest =
      endPointRef.current.getBoundingClientRect().top + window.pageYOffset;

    window.scroll({
      top: positionInitialCreatedQuest - 90,
      behavior: "smooth",
    });
  };


  return (
    <>
      <PopUpLoading
        show={creatingQuizStatus.showPopUp}
        loading={creatingQuizStatus.loading}
        pathRedirect="/painel"
      />
      <AlertSheet
        show={isCreatingQuestion}
        helperText={
          <span className="helper-text">
            Questão adicionada com sucesso em seu quiz!
          </span>
        }
        finallyLoading={() => setIsCreatingQuestion(false)}
      />
      <Header painel={{ back: true }}>
        <ButtonViewHistoryQuestions/>
      </Header>
      <Container>
        <C.CreateQuiz>
          <div className="title-create-quiz">
            <h1>Vamos montar o seu próprio quiz?</h1>
          </div>

          <h1 className="title-sumary">Informações gerais do Quiz</h1>
          <div className="lenguage-quiz box-create-quiz">
            <span className="subject-box">Linguagem</span>
            <p className="description-child">
              Antes de criar o quiz, escolha qual tecnologia será o foco das
              perguntas. Escolha uma área em que você tenha conhecimento e
              considere o público-alvo do quiz. Verifique se tem todos os
              recursos necessários para criar as perguntas e respostas.
              <br/><span>{"-->"} Escolha obrigatória</span>
            </p>
            <Checkboxes
              preValue={quizProducted.technology}
              onChange={(val) => addQuizAttributes(val, "technology")}
              options={configs.options.technology}
            />
          </div>

          <div className="box-create-quiz">
            <span className="subject-box">Nível</span>
            <p className="description-child">
              Definir o nível de dificuldade do seu quiz é fundamental para que
              os jogadores saibam o que esperar e possam se preparar
              adequadamente para enfrentar o desafio, evitando ficar tão
              perdidos quanto em um programa mal escrito.
              <br/><span>{"-->"} Escolha obrigatória</span>
            </p>
            <Checkboxes
              preValue={quizProducted.difficulty}
              onChange={(val) => addQuizAttributes(val, "difficulty")}
              options={configs.options.difficulty}
            />
          </div>

          <div className="box-create-quiz">
            <span className="subject-box">Tempo</span>
            <p className="description-child">
            É importante que você defina um tempo limite para a resolução das 
            questões em seu quiz, levando em consideração que dependendo de sua
            dificuldade as questões podem requerer mais tempo do que outras para 
            serem resolvidas com precisão.
            <br/><span>{"-->"} Escolha obrigatória</span>
            </p>
            <Checkboxes
              preValue={quizProducted?.questionTime?.toString() || ""}
              onChange={(val) => addQuizAttributes(val, "questionTime")}
              options={configs.options.questionTime}
            />
          </div>







          <h1 ref={endPointRef} className="title-sumary">
            Criar Questionário
          </h1>
          <div className="question-quiz box-create-quiz">
            <span className="subject-box">Questão</span>
            <p className="description-child">
              A seção da pergunta do quiz estará posicionada na parte superior
              do layout e incluirá a própria pergunta, juntamente com
              informações adicionais, como uma descrição ou observação
              complementar para auxiliar o jogador na resolução do desafio.{" "}
              <br/><span>{"-->"} Preenchimento obrigatório</span>
            </p>
            <TextArea
              label="Questão"
              onChange={(val) => addQuestionAttributes(val, "question")}
              reset={isResetQuestion}
              maxLength={questionCharacterLimit}
            />
          </div>

          <div className="support-quiz box-create-quiz">
            <span className="subject-box">Complemento da questão</span>
            <p className="description-child">
              Você agora tem a opção de adicionar um 'apoio' ao seu quiz, como
              uma imagem ou caixa de código. Lembre-se de que um apoio visual é
              crucial para complementar sua pergunta.
            </p>
            <SupportVisualQuiz
              onChange={
                (typesComplement) => {
                  addQuestionAttributes(typesComplement, "typesComplement")
                }}
              reset={isResetQuestion}
            />
          </div>

          <div className="alternatives-quiz box-create-quiz">
            <span className="subject-box">Alternativas da questão</span>
            <p className="description-child">
              Para criar um quiz ou teste, é importante oferecer alternativas de
              resposta para a pergunta. Essas alternativas podem ser compostas
              por uma linha de código ou texto. Geralmente, é recomendável
              fornecer pelo menos duas opções de resposta. No editor do quiz,
              você pode adicionar até <b>4 opções de resposta</b>.
              <br/><span>{"-->"} Escolha obrigatória</span>
            </p>
            <CreateAlternativesQuiz
              onChange={(val) => addQuestionAttributes(val, "alternatives")}
              reset={isResetQuestion}
            />
          </div>

          <nav id="nav-buttons-finally">
            {questionsProducted.length < limitedQuestions - 1 ? (
              <button onClick={ handleAddQuestion } id="button-add-quests">
                Adicionar mais uma questão
              </button>
            ) : questionsProducted.length === limitedQuestions - 1 ? (
              <button onClick={ handleSubmitQuiz} id="button-created-quiz">
                Criar quiz
              </button>
            ) : (
              <></>
            )}
            <p className="display-alert-questions">
              <i className="bx bxs-message-square-detail"></i>
              {limitedQuestions - questionsProducted.length} questões pendentes
              para serem criadas.
            </p>
          </nav>
        </C.CreateQuiz>
      </Container>
    </>
  );
}
