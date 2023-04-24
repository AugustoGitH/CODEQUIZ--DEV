import React, { useEffect, useState } from 'react';

import * as S from './styles';


import Checkboxes from '../../../../components/Checkboxes';

import { 
  complementTypes
 } from '../../../../settings/quiz/constants';

import CodeMirrorEditor from '../../../../components/CodeMirrorEditor';
import models from '../../../../settings/quiz/models';
import { ITypesComplement } from '../../../../interfaces/Quiz';



interface IPropsSupportVisualQuiz{
  onChange?: (complement: ITypesComplement) => void,
  reset?: boolean,
}

export default function SupportVisualQuiz({ 
  onChange, reset }: IPropsSupportVisualQuiz) {

    const { BLOCK_CODE, IMAGE } = complementTypes
  const [support, setSupport] = useState(""); 
    const [typesComplement, setTypesComplement] = useState<ITypesComplement>(
      models.newTypesComplement()
    )


  useEffect(() => {
    if(onChange){
      onChange(typesComplement);
    }
  }, [typesComplement]);

  useEffect(() => {
    if (reset) {
      setTypesComplement(models.newTypesComplement())
    }
  }, [reset]);

  useEffect(()=>{
    setTypesComplement(models.newTypesComplement())
  }, [support])

  return (
    <S.SupportVisualQuiz>
      <Checkboxes
        reset={reset}
        onChange={(option: string)=> setSupport(option)}
        options={[
          {
            label: (
              <span>
                <i className="bx bx-code-block"></i>Bloco de código
              </span>
            ),
            value: BLOCK_CODE,
          },
          {
            label: (
              <span>
                <i className="bx bxs-file-image"></i>Imagem ilustrativa
              </span>
            ),
            value: IMAGE,
          },
          { label: <span>Nenhum apoio</span>, value: "" },
        ]}
      />

      {support === BLOCK_CODE && (
        <div className="block-code">
          <CodeMirrorEditor
            reset={reset}
            onChange={(code: string, langMode)=> {
              setTypesComplement(prevTypes=> ({...prevTypes, blockCode: { 
                langMode, value: code
               }}))
            }}
            fieldSelectLang={true}
          />
        </div>
      )}
    </S.SupportVisualQuiz>
  );
}
