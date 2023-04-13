import styled from 'styled-components'

const PopUpConfirmStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000017;
  backdrop-filter: blur(3px);
  .card {
    background: var(--color-gray-light);
    border: 1.5px solid #00000022;
    padding: 3rem 2rem;
    border-radius: 0.5rem;
    border-radius: 0.9rem;
    
    width: 550px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @keyframes scaleTransition {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    animation: scaleTransition 0.3s ease-in;
    p {
      font-size: var(--font-size-medium);
      text-align: center;
      text-transform: uppercase;
      display: inline;
      position: relative;
    }
    nav {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 1rem;
      button {
        all: unset;
        font-size: var(--font-size-small);
        padding: 0.7rem 1rem;
        color: #fff;
        cursor: pointer;
        border-radius: 0.3rem;
        transition: 0.2s;
        &:nth-child(1) {
          background: var(--color-danger);
          border: 1.3px solid var(--color-danger);
          &:hover {
            background: transparent;
            color: var(--color-danger);
          }
        }
        &:nth-child(2) {
          background: var(--color-dark);
          color: #fff;
          border: 1.3px solid var(--color-dark);
          &:hover {
            color: var(--color-dark);
          background: transparent;
          }
        }
      }
    }
  }
`

export default PopUpConfirmStyled
