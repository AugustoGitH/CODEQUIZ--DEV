import { useEffect, useState } from 'react';
import { BlockCodeFormStyled } from '../styles';

interface IValueForm{
  [key: string]: string,
  apelido: string,
  email: string,
  senha: string
}

interface IPropsBlockCodeForm{
  onChange: (verify: boolean)=> void,
  helperText?: string | undefined
}

export default function BlockCodeForm({
  onChange,
  helperText = '',
}: IPropsBlockCodeForm) {

  const [valueForm, setValueForm] = useState<IValueForm>({
    apelido: '',
    email: '',
    senha: '',
  });

  const handleChangeConditions = (valueFormulary: IValueForm):boolean => {
    const conditions = {
      apelido: 'apelido()',
      email: 'email()',
      senha: 'senha()',
    } as IValueForm
    let resultTrues = 0;
    for (const response in conditions) {
      if (conditions[response] === valueFormulary[response]) resultTrues++;
    }
    return resultTrues === Object.keys(conditions).length;
  };

  useEffect(() => {
    onChange(handleChangeConditions(valueForm));
  }, [valueForm]);


  const handleSetValuesForm = (key: string, ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    if (value.includes('()')) ev.target.style.color = '#4d4df6';
    else ev.target.style.color = '#188038';
    setValueForm((prevValForm) => ({ ...prevValForm, [key]: value }));
  };

  return (
    <BlockCodeFormStyled>
      <div className="card-code">
        <p className="line-comment-code">
          // Complete o código para prosseguir com o seu registro!
        </p>
        <p className="line-create-object">
          <span style={{ color: '#4d4df6' }}>const</span> usuario ={' '}
        </p>
        <ul className="object-values-form">
          <li>
            apelido:{' '}
            <input
              value={valueForm.apelido}
              autoComplete="off"
              spellCheck="false"
              onChange={(ev) => handleSetValuesForm('apelido', ev)}
            />
            ,
          </li>
          <li>
            email:{' '}
            <input
              value={valueForm.email}
              autoComplete="off"
              spellCheck="false"
              onChange={(ev) => handleSetValuesForm('email', ev)}
            />
            ,
          </li>
          <li>
            senha:{' '}
            <input
              value={valueForm.senha}
              autoComplete="off"
              spellCheck="false"
              onChange={(ev) => handleSetValuesForm('senha', ev)}
            />
            ,
          </li>
        </ul>
        <p className="line-default-code">
          <span>registrar</span>(
          <span style={{ color: '#4d4df6' }}>usuario</span>)
        </p>
      </div>
      {helperText && <p className="helper-text-block">{helperText}</p>}
    </BlockCodeFormStyled>
  );
}
