import { useEffect, useState } from 'react';
import CheckboxesStyled from './styles';

interface IOptionCheckboxes{
    value: string,
    label: React.ReactNode
}

interface IPropsCheckboxes{
    options: IOptionCheckboxes[],
    onChange?: (value: string)=> void,
    preValue?: string,
    reset?: boolean
}


export default function Checkboxes({
  options,
  onChange,
  preValue = "",
  reset,
}: IPropsCheckboxes) {
  const [optionMarked, setOptionMarked] = useState("");

  useEffect(() => {
    if (preValue && options.map(option => option.value).includes(preValue)) {
      setOptionMarked(preValue);
    }
  }, [preValue]);

  useEffect(() => {
    if(onChange){
        onChange(optionMarked);
    }
  }, [optionMarked]);

  useEffect(() => {
    if (reset) {
      setOptionMarked(preValue);
    }
  }, [reset]);

  return (
    <CheckboxesStyled>
      {options?.map((option, index) => (
        <li
          key={index}
          className={optionMarked === option.value ? 'marked' : ''}
          onClick={() => setOptionMarked(option.value)}
        >
          <div className="checkbox"></div>
          <div className="badge">{option.label}</div>
        </li>
      ))}
    </CheckboxesStyled>
  );
}
