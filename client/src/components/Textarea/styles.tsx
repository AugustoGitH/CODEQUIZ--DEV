import styled from 'styled-components'

interface IPropsTextareaStyled {
  height: number
}

const TextareaStyled = styled.div<IPropsTextareaStyled>`
  width: 100%;
  background: #282c34;
  border-radius: 0.6rem;
  padding: 2rem;
  position: relative;
  font-family: var(--font-Consolas);
  @media (max-width: 500px) {
    padding: 1.5rem;
  }
  &::after {
    content: '}';
    color: #c5a5c5;
  }
  label {
    display: block;
    color: #c5a5c5;
    font-size: var(--font-size-small);
    span {
      color: #79b6f2;
    }
  }
  .textarea-container {
    margin-top: 0.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: start;
    gap: 1rem;
    padding-left: 2rem;
    @media (max-width: 500px) {
      gap: 0.5rem;
      padding-left: 1rem;
    }
    .return-caracteres {
      color: #ff9191;
      font-size: var(--font-size-small);
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
    }
    textarea {
      width: 100%;
      height: ${(props) => `${props.height}px`};
      resize: none;
      outline: none;
      background: transparent;
      border: none;
      color: #fac863;
      line-height: 1rem;
      font-size: var(--font-size-small);
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
      &::placeholder {
        color: #c5a5c587;
      }
      &::-webkit-scrollbar {
        width: 5px; /* width of the entire scrollbar */
      }

      &::-webkit-scrollbar-track {
        background: transparent; /* color of the tracking area */
      }

      &::-webkit-scrollbar-thumb {
        background-color: #353547; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
      }
    }
  }
  .counter-caracteres {
    color: #ffffffac;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    pointer-events: none;
    font-size: var(--font-size-small);
    @media (max-width: 500px) {
      font-size: var(--font-size-super-small);
    }
  }
`

export default TextareaStyled
