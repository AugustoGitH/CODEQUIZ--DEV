import styled from 'styled-components'
import animationsPresence from '../../../../animations/presence'

export const QuestionsReview = styled.div`
    padding: 1rem 0;
  .display-control-navigate {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .button-navigate-questions, .navigate-button-back {
      all: unset;
      font-size: 1.1rem;
      background: var(--color-dark);
      width: 30px;
      color: var(--color-light);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      ${animationsPresence.scale};
      position: relative;
      transition: .2s;
      i {
        transition: 0.2s;
      }
    }
    .direction-left::after, .direction-right::after, .navigate-button-back::after{
      background-color: #1b1b22dd;
      position: absolute;
      font-size: .6rem;
      padding: .3rem .6rem;
      border-radius: .2rem;
      bottom: -1.6rem;
      opacity: 0;
      transform: translateY(-10px);
      transition: .2s;
      text-transform: uppercase;
      pointer-events: none;
      
    }
    .direction-left,  .direction-right, .navigate-button-back{
      &:hover{
        &::after{
          opacity: 1;
          transform: translateY(0px);
        }
      }
    }

    .direction-left{
      &::after{
        content: "Retroceder";
      }
      &:hover{
        i{
          transform: translateX(-7px);
        }
      }
    }
    .direction-right {
      &:hover{
        i{
          transform: translateX(7px);
        }
      }
      &::after{
        content: "Avançar";
      }
    }
    .navigate-button-back{
      background-color: var(--color-info);
      font-size: .9rem;
      &::after{
        content: "Sair";
      }
    }
  }
`
