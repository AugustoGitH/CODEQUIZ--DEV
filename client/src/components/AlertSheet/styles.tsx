import styled from 'styled-components'

const AlertSheetStyled = styled.div`
  position: fixed;
  top: 8rem;
  right: 0;
  z-index: 10;
  background: #f2f2f2;
  padding: 1.4rem 5rem 1rem 6rem;
  border-top-left-radius: 4rem;
  border-bottom-left-radius: 4rem;
  font-size: 1.4rem;
  letter-spacing: -0.1rem;
  font-family: var(--font-Consolas);
  transition: 0.3s ease-out;
  border: 1.5px solid #00000038;
  @media (max-width: 500px) {
    padding: 1.4rem 1rem 1rem 5rem;
    }
  @keyframes translatePresence {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: translatePresence 0.3s ease-out;
  .helper-text {
    display: inline-block;
    color: #000000;
    max-width: 500px;
    line-height: 1.2rem;
    font-size: var(--font-size-medium);
  }
  .icon-add-question {
    position: absolute;
    left: 1.4rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.1rem;
    color: #fff;
    width: 45px;
    height: 45px;
    background: #282c34;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    @media (max-width: 500px) {
      width: 40px;
      height: 40px;
      font-size: .9rem;
    }
    .icon-plus {
      background: red;
      position: absolute;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      bottom: -0.7rem;
      right: -0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      @media (max-width: 500px) {
        width: 22px;
        height: 22px;
        font-size: 0.8rem;
        bottom: -.2rem;

      }
    }
  }
  .progress-container {
    margin-top: 1rem;
    width: 100%;
    height: 2px;
    background: #282c3420;
    transition: 0.2s;
    .progress-bar {
      height: 100%;
      background: #282c34;
      transition: 0.2s;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 12px;
        height: 12px;
        background: #282c34;
        border-radius: 50%;
      }
    }
  }
`

export default AlertSheetStyled
