import { useEffect, useState } from 'react';

import TextareaStyled from './styles';


interface IPropsTextarea{
    height?: number,
    maxLength?: number,
    label: string,
    onChange?: (value: string)=> void,
    reset: boolean
}

export default function Textarea({
  height = 100,
  maxLength = 500,
  label,
  onChange,
  reset,
}: IPropsTextarea) {
  const [isValue, setIsValue] = useState('');
  const [counterCaracteres, setCounterCaracteres] = useState(0);

  useEffect(() => {
    if (reset) {
      setIsValue('');
    }
  }, [reset]);

  useEffect(() => {
    if(onChange){
        onChange(isValue);
    }
    setCounterCaracteres(isValue.length);
    if (isValue.length >= maxLength) {
      setIsValue((prevValue) => prevValue.substring(0, maxLength));
    }
  }, [isValue]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    setIsValue(value);
  }

  return (
    <TextareaStyled height={height}>
      <label>
        function <span>{label}</span>
        {'(){'}{' '}
      </label>
      <div className="textarea-container">
        <span className="return-caracteres">return</span>
        <textarea
          value={`${isValue}`}
          autoComplete="off"
          spellCheck="false"
          placeholder="// Escreva aqui"
          onChange={handleChange}
        ></textarea>
      </div>
      <span className="counter-caracteres">
        {counterCaracteres}/{maxLength}
      </span>
    </TextareaStyled>
  );
}
