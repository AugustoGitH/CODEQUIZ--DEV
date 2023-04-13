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
    .button-back-results{
        all: unset;
        font-family: var(--font-Consolas);
        color: var(--color-dark);
        padding: .5rem 1rem;
        border-radius: .3rem;
        font-size: .8rem;
        cursor: pointer;
        border: 1.3px solid var(--color-dark);
        transition: .2s;
        &:hover{
            background: var(--color-dark);
            color: var(--color-light)
        }
    }
    .button-navigate-questions {
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
      ${animationsPresence.scale}
      i {
        transition: 0.2s;
      }
    }
    .direction-left:hover {
        i {
          transform: translateX(-7px);
        }
    }
    .direction-right:hover {
        i {
          transform: translateX(7px);
        }
    }
  }
`
