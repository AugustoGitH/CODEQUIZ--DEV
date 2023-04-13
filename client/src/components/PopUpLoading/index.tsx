/* eslint-disable max-len */
import { useEffect } from 'react';
import PopUpStyled from './styles';
import { Link } from 'react-router-dom';

interface IPropsPopUpLoading {
    show: boolean,
    loading: boolean | null,
    pathRedirect: string
}


export default function PopUpLoading({
  show,
  loading = null,
  pathRedirect = '/',
}: IPropsPopUpLoading) {
  useEffect(() => {
    if (show) {
      document.body.classList.add('overflowY-none');
    } else {
      document.body.classList.remove('overflowY-none');
    }
  }, [show]);

  return (
    show ? (
      <PopUpStyled>
        <div className="card">
          <p>
            {'>'}{' '}
            {loading
              ? 'Estamos colocando o seu quiz no ar! Aguarde um momento.'
              : loading !== null && !loading
              ? 'O seu quiz foi criado com sucesso!'
              : ''}
          </p>
            <img src="https://i.pinimg.com/originals/9d/9b/d1/9d9bd13afce1a798d22ecfd9897730ed.gif" />
          {loading !== null && !loading && (
            <Link to={pathRedirect}>Volte para o painel</Link>
          )}
        </div>
      </PopUpStyled>
    ) : <></>
  );
}
