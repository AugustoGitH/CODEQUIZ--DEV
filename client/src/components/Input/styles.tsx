import styled from 'styled-components'

const InputStyled = styled.div`
  width: 100%;
  margin-top: 1rem;
  background: #282a36;
  padding: 0.9rem 0.9rem 1.7rem 0.9rem;
  position: relative;
  border-radius: 0.5rem;
  &::after {
    content: '}';
    position: absolute;
    bottom: 0.6rem;
    color: #36f900;
    font-size: var(--font-size-small);
    @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
  }
  .helper-text-input {
    font-family: 'Roboto Mono';
    position: absolute;
    color: #ff0404;
    font-size: 0.7rem;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    width: 400px;
    text-align: end;
    line-height: 0.7rem;
    animation: presenceOpacity 0.3s;
  }
  label {
    text-transform: lowercase;
    color: #36f900;
    display: inline-block;
    font-size: var(--font-size-small);
    @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
    &::after {
      content: '(){';
      color: #ffc5c5;
    }
  }
  .input-content {
    width: 100%;
    height: 30px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    .button-vision-password {
      color: #fff;
      position: absolute;
      right: 1rem;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.2s;
    }
    span {
      display: inline-block;
      color: #ff9191;
      font-size: var(--font-size-small);
      margin-left: 1.5rem;
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
    }
    input {
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
      border: none;
      font-family: var(--font-Electrica);
      padding: 0 0.5rem;
      color: #ddff00;
      font-size: var(--font-size-small);
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
      &::placeholder {
        color: #c5a5c587;
      }
    }
  }
`

export default InputStyled
