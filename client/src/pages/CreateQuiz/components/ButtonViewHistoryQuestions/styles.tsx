import styled from 'styled-components'
import animationPresence from '../../../../animations/presence'

const Container = styled.div`
  position: relative;
`
const ButtonView = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #282c34;
  border: 1.3px solid #282c34;
  font-size: 0.9rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  i,
  .quantity-questions {
    pointer-events: none;
  }
  .quantity-questions {
    position: absolute;
    bottom: -0.5rem;
    right: -0.5rem;
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    i {
      color: #282c34;
    }
    background: transparent;
  }
`

const PopUpHistoryQuestions = styled.div`
  font-family: var(--font-Electrica);
  position: absolute;
  max-width: 700px;
  max-height: 400px;
  overflow: auto;
  right: 0rem;
  background: #fff;
  border: 1.3px solid #282c3442;
  box-shadow: 0px 0px 15px #00000024;
  padding: 2rem 1rem;
  border-radius: 0.4rem;
  margin-top: 1.7rem;
  z-index: 10;
  @media (max-width: 700px) {
    position: fixed;
    width: 100%;
  }
  @media (max-width: 500px) {
      padding: 2rem .5rem;
    }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f2f2f2;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2b2b2b;
    border-radius: 20px;
    border: 2px solid #f2f2f2;
  }
  ${animationPresence.translateRight}

  h2 {
    width: 430px;
    text-align: start;
    font-size: var(--font-size-small);
    color: #fac863;
    background: #282c34;
    font-weight: 100;
    padding: 0.3rem 1.4rem;
    border-radius: 0.3rem;
    @media (max-width: 700px) {
      max-width: 100%;
      width: 100%;
      text-align: center;
    }
    span {
      text-transform: lowercase;
      color: #dbb1db;
      margin-right: 0.5rem;
    }
  }
`

const ListQuestionsHistory = styled.div`
  margin-top: 2rem;
  width: 600px;
  @media (max-width: 700px) {
    width: 100%;
  }
  .question {
    width: 100%;
    border: 1.3px solid #f2f2f2;
    padding: 1rem 1.4rem;
    position: relative;
    margin-bottom: 3rem;
    transition: 0.2s;
    @media (max-width: 500px) {
      padding: 1rem .5rem;
    }
    .button-delete-question {
      all: unset;
      position: absolute;
      background: red;
      color: #fff;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -0.4rem;
      right: -0.4rem;
      cursor: pointer;
      i {
        pointer-events: none;
      }
    }
    p {
      line-height: 1.1rem;
    }
    .block-editor {
      margin-top: 1rem;
      width: 100%;
    }
    .grid-alts {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
    .flex-full-alts {
      display: flex;
      flex-direction: column;
    }
    .alternatives {
      width: 100%;
      margin-top: 1rem;
      gap: .5rem;
      .alt-correct {
        background: #79ff79;
      }
      li {
        font-size: var(--font-size-super-small);
        background: #f2f2f2;
        padding: 0.4rem .8rem;
        border-radius: 0.3rem;
        display: flex;
        align-items: center;
        height: var(--height-alternative);
        white-space: break-spaces;
        word-break: break-all;
        cursor: default;
        .letter-alt {
          flex: none;
          display: inline-flex;
          width: 30px;
          height: 30px;
          background: #282c34;
          color: #fff;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          margin-right: 0.6rem;
        }
      }
    }
  }
`

export { ListQuestionsHistory, ButtonView, PopUpHistoryQuestions, Container }
