import styled from 'styled-components'
import animationsPresence from '../../animations/presence'

const PopUpStyled = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 15;
  background: #00000017;
  backdrop-filter: blur(3px);
  padding: 4rem;
  @media (max-width: 690px) {
    padding: 0;
    }
  .card {
    width: 800px;
    background: #fff;
    padding: 3rem;
    border-radius: 0.9rem;
    box-shadow: 0px 0px 70px #0000002a;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1.7px solid #00000048;
    ${animationsPresence.scale};
    @media (max-width: 690px) {
      width: 100%;
      height: 100%;
    }
    @keyframes presenceOpacity {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    p {
      display: inline;
      background: #f2f2f2;
      padding: 0.7rem 2rem;
      font-size: var(--font-size-medium);
      border-radius: 0.4rem;
      animation: presenceOpacity 0.3s;
      text-align: center;

      text-transform: uppercase;
      border: 1.4px solid #00000024;
      @media (max-width: 500px) {
        font-size: var(--font-size-small);
      }
    }
    img {
      width: 200px;
      margin-top: 3rem;
    }
    a {
      display: inline-block;
      background: #282c34;
      color: #fff;
      cursor: pointer;
      font-size: var(--font-size-small);
      
      padding: 0.9rem 2rem;
      margin-top: 3rem;
      border-radius: 0.4rem;
      border: 1.3px solid #282c34;
      transition: 0.2s;
      animation: presenceOpacity 0.3s;
      text-transform: uppercase;
      @media (max-width: 500px) {
        font-size: var(--font-size-super-small);
      }
      &:hover {
        background: transparent;
        color: #282c34;
      }
    }
  }
`

export default PopUpStyled
