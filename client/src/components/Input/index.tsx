import { useEffect, useState } from 'react';

import InputStyled from './styles';


interface IPropsInputCode{
    label: string,
    type?: string,
    onChange: (value: string)=> void,
    helperText?: string | undefined,
    error?: boolean
}


export default function InputCode({
  label,
  type = 'text',
  onChange,
  helperText = '',
  error,
}: IPropsInputCode) {
  const [value, setValue] = useState('');
  const [ocultPass, setOcultPass] = useState(false);

  const handleOcultPass = () => {
    setOcultPass((prevSt) => !prevSt);
  };

  useEffect(() => {
    if(onChange){
        onChange(value);
    }
  }, [value]);

  return (
    <InputStyled>
      <label>{label}</label>
      {helperText && <span className="helper-text-input">{helperText}</span>}
      <div className="input-content">
        <span>return</span>
        <input
          placeholder="// escreva aqui"
          type={
            type === 'password' && !ocultPass
              ? 'password'
              : type === 'password' && ocultPass
              ? 'text'
              : type
          }
          style={error ? { color: 'red' } : {}}
          onChange={(ev) => setValue(ev.target.value)}
        />
        {type === 'password' && (
          <i
            onClick={handleOcultPass}
            className="bx bxs-low-vision button-vision-password"
            style={{ color: !ocultPass ? '#36f900' : '' }}
          ></i>
        )}
      </div>
    </InputStyled>
  );
}
