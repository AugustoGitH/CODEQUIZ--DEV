import { Link } from 'react-router-dom';
import Container from '../../components/Container';

import { NotFoundScreenStyled } from './styles';
export default function NotFoundScreen() {
  return (
    <Container>
      <NotFoundScreenStyled>
        <h2>404 NOT FOUND</h2>
        <h1>Página não encontrada :(</h1>
        <Link id="link-back" to="/">
          Voltar para o início
        </Link>
      </NotFoundScreenStyled>
    </Container>
  );
}
