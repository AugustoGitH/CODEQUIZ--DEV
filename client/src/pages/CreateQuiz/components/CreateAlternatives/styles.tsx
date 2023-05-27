import styled from "styled-components";

import animationsPresence from "../../../../animations/presence";


const FSAlternativeNormal = "0.9rem"
const FSAlternativeCell = "0.7rem"


export const TextareaCreatedAlt = styled.div`
  width: 700px;
  height: 60px;
  @media (max-width: 850px) {
    width: 100%;
  }
  background: #f2f2f2;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3rem 1rem;
  textarea {
    line-height: 1rem;
    font-family: var(--font-Electrica);
    border: none;
    background: transparent;
    font-size: ${FSAlternativeNormal};
    outline: none;
    width: 100%;
    resize: none;
    overflow: auto;
    height: auto;
    white-space: break-spaces;
    margin-left: 1rem;
    
    @media (max-width: 500px) {
      font-size:  ${FSAlternativeCell};
    }
    &::placeholder {
      color: #0000004f;
    }
  }
  .alt-letter {
    flex: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #282c34;
    border-radius: 50%;
    color: #fff;
    @media (max-width: 500px) {
      font-size:  .8rem;
    }
  }
`;


export const CreateAlternativesQuiz = styled.div`
  .field-create-alt {
    .field-alt {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      align-items: center;
      ${animationsPresence.translateRight}

      .button-add-alt {
        all: unset;
        flex: none;
        background: #7a7aff;
        border: 1.4px solid #7a7aff;
        color: #fff;
        font-family: var(--font-Consolas);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 1rem;
        transition: 0.2s;
        font-size: 1.3rem;
        @media (max-width: 880px) {
          margin-left: .5rem;
        }
        @media (max-width: 624px) {
          width: 35px;
          height: 35px;
          font-size: 1rem;
        }
        &:hover {
          background: transparent;
          color: #7a7aff;
        }
      }

    }
  }
  .alert-alts {
    display: inline-block;
    margin-top: 0.8rem;
    font-family: var(--font-Consolas);
    background: #f2f2f2;
    border-radius: 0.4rem;
    padding: 0.4rem 1rem;
    font-size: var(--font-size-small);
    width: 700px;
    line-height: 1.3rem;
    cursor: default;
    border: 1.3px solid #00000027;
    @media (max-width: 850px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      font-size: var(--font-size-super-small);
      line-height: .9rem;
    }
    text-align: center;
    .button-defined-alt-correct {
      all: unset;
      width: 20px;
      height: 20px;
      background: #7a7aff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #fff;
      font-size: 0.7rem;
      margin: 0.3rem;
      @media (max-width: 400px) {
        width: 16px;
        height: 16px;
        font-size: 0.6rem;
      }
    }
  }
  .grid-alts {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .flex-full-alts {
    display: flex;
    flex-direction: column;
  }
  .list-alternatives-created-quiz {
    margin-top: 3rem;
    gap: 1rem;
    transition: 0.2s;
    width: 700px;
    @media (max-width: 850px) {
      width: 100%;
    }
    .alternative-correct {
      background: #79ff79;
      #button-delete-alt {
        background: #282c34;
      }
      .button-defined-alt-correct {
        background: #282c34;
      }
    }
    li {
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      background: #f2f2f2;
      padding: 1rem 2rem 1rem 1rem;
      position: relative;
      transition: 0.2s;
      ${animationsPresence.scale};
      height: var(--height-alternative);
      .button-defined-alt-correct {
        all: unset;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
        width: 20px;
        height: 20px;
        background: #7a7aff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: #fff;
        font-size: 0.8rem;
        cursor: pointer;
      }
      #button-delete-alt {
        position: absolute;
        right: 0.2rem;
        bottom: 1rem;
        width: 20px;
        height: 20px;
        background: red;
        border: none;
        color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .alt-letter {
        flex: none;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #282c34;
        border-radius: 50%;
        color: #fff;
        margin-right: 1rem;
        @media (max-width: 500px) {
          font-size:  .8rem;
          margin-right: .6rem;
        }
      }
      p {
        line-height: 0.9rem;
        white-space: break-spaces;
        font-size: var(--font-size-small);
        word-break: break-all;
        @media (max-width: 500px) {
          font-size: var(--font-size-super-small);
        }
      }
    }
  }
`;
