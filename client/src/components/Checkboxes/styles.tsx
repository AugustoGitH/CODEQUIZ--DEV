import styled from 'styled-components';

const CheckboxesStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  transition: 0.2s;
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .marked {
    .checkbox {
      background: var(--color-dark);
    }
    .badge {
      background: var(--color-dark);
      color: var(--color-light);
    }
  }
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      .checkbox {
        background: var(--color-dark);
      }
      .badge {
        background: var(--color-dark);
        color: var(--color-light);
      }
    }
    .checkbox {
      width: 20px;
      height: 20px;
      border: 1.4px solid var(--color-dark);
      border-radius: 50%;
      margin-right: 0.6rem;
      transition: 0.3s;
      flex: none;
    }
    .badge {
      all: unset;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0 1.4rem;
      height: 50px;
      border-radius: 0.6rem;
      text-transform: uppercase;
      border: 1.4px solid var(--color-dark);
      transition: 0.3s;
      font-size: var(--font-size-small);
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
        height: 45px;
      }
      span {
        display: flex;
        align-items: center;
        i {
          font-size: 1.6rem;
          margin-right: 1.1rem;
        }
      }
    }
  }
`;

export default CheckboxesStyled;
