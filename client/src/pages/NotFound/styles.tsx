import styled from 'styled-components';

const NotFoundScreenStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    color: #646464;
  }
  #link-back {
    margin-top: 2rem;
    color: var(--color-info);
    text-transform: uppercase;
    font-size: var(--font-size-button-medium);
    text-decoration: none;
    padding: 0.7rem 2rem;
    border: 1.5px solid var(--color-info);
    transition: 0.2s;
    cursor: pointer;
    border-radius: .4rem;
    &:hover {
      background: var(--color-info);
      color: #fff;
    }
  }
`;

export { NotFoundScreenStyled };