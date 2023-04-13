import styled from 'styled-components'

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
  .card {
    width: 800px;
    background: #fff;
    padding: 3rem;
    font-family: var(--font-Consolas);
    border-radius: 0.9rem;
    box-shadow: 0px 0px 70px #0000002a;
    color: #000;
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
      font-size: 1.2rem;
      border-radius: 0.4rem;
      animation: presenceOpacity 0.3s;
    }
    img {
      width: 200px;
      margin-top: 2rem;
    }
    a {
      display: inline-block;
      background: #282c34;
      color: #fff;
      cursor: pointer;
      font-size: 1.4rem;
      letter-spacing: -0.1rem;
      padding: 0.7rem 2rem;
      margin-top: 3rem;
      border-radius: 0.4rem;
      border: 1.3px solid #282c34;
      transition: 0.2s;
      animation: presenceOpacity 0.3s;
      &:hover {
        background: transparent;
        color: #282c34;
      }
    }
  }
`

export default PopUpStyled
