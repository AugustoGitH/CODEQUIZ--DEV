import { useEffect } from 'react';
import PopUpConfirmStyled from './styles';


interface IPropsPopUpConfirm {
    show: boolean,
    handleClickButtons: {
        not: ()=> void,
        yes: ()=> void
    },
    helperText?: string
}

export default function PopUpConfirm({
  show,
  handleClickButtons,
  helperText = '',
}: IPropsPopUpConfirm) {

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflowY-none');
    } else {
      document.body.classList.remove('overflowY-none');
    }
  }, [show]);
  return (
    show ? (
      <PopUpConfirmStyled>
        <div className="card">
          <p>
            {helperText}
          </p>
          <nav>
            <button onClick={() => handleClickButtons.yes()}>Sim</button>
            <button onClick={() => handleClickButtons.not()}>Não</button>
          </nav>
        </div>
      </PopUpConfirmStyled>
    ) : <></>
  );
}