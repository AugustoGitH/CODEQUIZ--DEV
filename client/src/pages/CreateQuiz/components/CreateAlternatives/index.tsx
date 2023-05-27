/* eslint-disable max-len */
import { useEffect, useState } from "react";


import Checkboxes from "../../../../components/Checkboxes";
import { IAlternative } from "../../../../interfaces/Quiz";
import configsCreatingQuiz from "../../../../settings/quiz/configs";
import { alternativeTypes } from "../../../../settings/quiz/constants";
import creatingQuizModels from "../../../../settings/quiz/models";
import { checkAmountCharsLines } from "../../../../utils/checkAmountCharsLines";
import Alternative from "./components/Alternative";
import TextareCreatedAlt from "./components/TextareCreatedAlt"
import * as C from "./styles";




interface IPropsFieldCreate {
  onChange: (alternative: IAlternative) => void;
  listAlternatives: IAlternative[];
  reset?: boolean;
}

function FieldCreate({
  onChange,
  listAlternatives = [],
  reset,
}: IPropsFieldCreate) {
  const [alternativeType, setAlternativeType] = useState("");
  const [valueAlternative, setValueAlternative] = useState("");
  const { newAlternative } = creatingQuizModels;
  const { alternativeCharacterLimit, limitedAlternatives } = configsCreatingQuiz

  useEffect(() => {
    if (reset) {
      setAlternativeType("");
      setValueAlternative("");
    }
  }, [reset]);

  const handleClickCreateAlternative = () => {
    if (
      !valueAlternative ||
      valueAlternative.length > alternativeCharacterLimit
    ) return;

    onChange(
      newAlternative({
        value: valueAlternative,
        type: alternativeType,
        numberIndex: listAlternatives.length,
        correct: false,
      })
    );
    setValueAlternative("");
  };

  return (
    <div className="field-create-alt">
      <Checkboxes
        reset={reset}
        onChange={(option) => setAlternativeType(option)}
        options={[
          {
            label: (
              <span>
                <i className="bx bx-text"></i>Linha de Texto
              </span>
            ),
            value: alternativeTypes.LINE_TEXT,
          },
        ]}
      />

      {alternativeType !== null &&
        listAlternatives.length + 1 <= (limitedAlternatives - 1) &&
        alternativeType ? (
        <div className="field-alt">
          {alternativeType === alternativeTypes.LINE_TEXT && (
            <C.TextareaCreatedAlt>
              <span className="alt-letter">
                {"ABCD"[listAlternatives.length]}
              </span>
              <TextareCreatedAlt
                placeholder="// Escreva aqui"
                value={valueAlternative}
                onChange={(ev) => setValueAlternative(ev.target.value)}
                autoComplete="off"
                spellCheck={false}
                maxLines={2}
                rows={2}
                maxLength={configsCreatingQuiz.alternativeCharacterLimit}
              />
            </C.TextareaCreatedAlt>
          )}
          <button
            onClick={handleClickCreateAlternative}
            className="button-add-alt"
          >
            <i className="bx bx-plus"></i>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}


interface IPropsCreateAlternativesQuiz {
  onChange?: (alternatives: IAlternative[]) => void;
  reset?: boolean;
}


export default function CreateAlternativesQuiz({
  onChange,
  reset,
}: IPropsCreateAlternativesQuiz) {
  const [createdAlterantives, setCreatedAlternatives] = useState<
    IAlternative[]
  >([]);


  useEffect(() => {
    if (onChange) {
      onChange(createdAlterantives);
    }
  }, [createdAlterantives]);


  useEffect(() => {
    if (reset) setCreatedAlternatives([]);
  }, [reset]);


  const selectedAlternativeCorrectly = (alternative: IAlternative) => {
    const cloneAlternativesCreated = createdAlterantives.slice();
    const clearCorrectsAlternatives = cloneAlternativesCreated.map((cloneAlt) =>
      cloneAlt.id === alternative.id
        ? { ...alternative, correct: !alternative.correct }
        : { ...cloneAlt, correct: false }
    );
    setCreatedAlternatives(clearCorrectsAlternatives);
  }

  const createAlternativeQuiz = (alternative: IAlternative) => {
    setCreatedAlternatives((prevAlts) => [...prevAlts, alternative]);
  };

  const deleteAlternativeQuiz = (id: string) => {
    setCreatedAlternatives((prevAlts) => {
      return prevAlts.filter((alt) => alt.id !== id);
    });
  }




  return (
    <C.CreateAlternativesQuiz>
      <FieldCreate
        onChange={createAlternativeQuiz}
        listAlternatives={createdAlterantives}
        reset={reset}
      />
      {createdAlterantives.length >= 2 && (
        <span className="alert-alts">
          Selecione qual alternativa será a resposta correta. Apenas aperte o
          botão
          <button className="button-defined-alt-correct">
            <i className="bx bxs-like"></i>
          </button>
        </span>
      )}
      <ul
        className={`list-alternatives-created-quiz ${checkAmountCharsLines(createdAlterantives)
          ? "flex-full-alts"
          : "grid-alts"
          }`}
      >
        {
          createdAlterantives?.map((alt, index, alts) => (
            <Alternative
              key={alt.id}
              alternative={alt}
              index={index}
              alternatives={alts}
              onDelete={deleteAlternativeQuiz}
              onCorrectly={selectedAlternativeCorrectly}
            />
          ))
        }
      </ul>
    </C.CreateAlternativesQuiz>
  );
}
