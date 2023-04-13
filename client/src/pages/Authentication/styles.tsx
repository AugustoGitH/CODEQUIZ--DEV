import styled from 'styled-components'

const RegisterScreenStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 0;
  @media (max-width: 700px) {
    padding: 7rem 0;
  }
  .card {
    width: 600px;
    @media (max-width: 700px) {
      width: 100%;
    }
    h1 {
      line-height: 1.8rem;
      font-weight: 100;
      padding: 0.4rem 1rem;
      display: inline-flex;
      background: #282a36dd;
      color: #fff;
      border-radius: 0.5rem;
      letter-spacing: -0.1rem;
      font-size: 1.3rem;
      #title::before {
        content: '<';
      }
      #title::after {
        content: '/>';
      }
    }
  }
  form {
    margin-top: 1rem;
    .button-submit-container {
      width: 100%;
      margin-top: 3rem;
      text-align: start;
      font-family: var(--font-Roboto-Mono);
      button {
        all: unset;
        background: transparent;
        color: #fff;
        padding: 0.9rem 1.5rem;
        font-size: var(--font-size-small);
        border-radius: 0.4rem;
        background: #4d4df6;
        cursor: pointer;
        border: 1.3px solid #4d4df6;
        transition: 0.2s ease-out;
        display: inline-flex;
        align-items: center;
        margin-right: 1rem;
        &:hover {
          background: transparent;
          color: #4d4df6;
        }
      }
      a {
        color: #4d4df6;
        cursor: pointer;
        font-size: 0.8rem;
      }
    }
  }
`

const BlockCodeFormStyled = styled.div`
  margin-top: 2rem;

  .helper-text-block {
    color: #ae0303;
    font-size: 1rem;
    line-height: 1rem;
    margin-top: 0.4rem;
    @keyframes presenceOpacity {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    animation: presenceOpacity 0.3s;
  }
  .card-code {
    background: #f1f3f4;
    padding: 1rem;
    border-radius: 0.3rem;
    font-family: 'Roboto Mono';
    color: #37474f;
    font-size: var(--font-size-small);
    @media (max-width: 500px) {
      font-size: var(--font-size-super-small);
    }
    .line-comment-code {
      color: #b80672;
      margin-bottom: 1rem;
    }
    .line-default-code {
      margin-top: 1rem;
    }
    .line-create-object {
      &::after {
        content: '{';
      }
    }
    ul {
      &::after {
        content: '}';
      }
      li {
        margin: 0.4rem 0;
        padding-left: 2rem;
        input {
          all: unset;
          border-bottom: 1.2px solid #0000004a;
          color: #188038;
        }
      }
    }
  }
`

export { RegisterScreenStyled, BlockCodeFormStyled }
