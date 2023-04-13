import styled from 'styled-components'

const Apresentation = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem 0;

  .ace-editor-block {
    width: var(--width-container-page);
    height: 350px;
    margin: 0 var( --padding-container-page);
    @media (max-width: 1000px) {
      width: 100%;
      padding: 0;
      background-color: var(--color-dark);
    }
    @media (max-width: 500px){
      height: 450px;
    }
  }
  nav {
    width: 100%;
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    gap: 0.9rem;
    padding: 0 var( --padding-container-page);
    @media (max-width: 560px) {
      flex-direction: column;
      margin-top: 2rem;
      gap: 0.3rem;
      button {
        width: 100%;
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
`

const StartGame = styled.section`
  width: 100%;
  padding: 4rem var(--padding-container-page);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: var(--width-container-page);
    text-align: center;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h1 {
        font-size: var(--font-size-super-large);
        line-height: 2.1rem;
        text-transform: uppercase;
        letter-spacing: -0.1rem;
        @media (max-width: 500px) {
          font-size: var(--font-size-large);
          line-height: 1.9rem;
        }
        span {
          background: #282a36;
          color: #fff;
          padding: 0.3rem;
          border-radius: 0.3rem;
        }
      }
      p {
        margin-top: 1rem;
        font-size: var(--font-size-medium);
        line-height: 1.5rem;
        font-family: var(--font-Consolas);
        color: var(--color-dark);
        letter-spacing: -0.1rem;
        margin-bottom: 3rem;
        max-width: 600px;
        @media (max-width: 500px) {
          font-size: var(--font-size-small);
          line-height: 1.2rem;
        }
      }
    }
  }
`

export { Apresentation, StartGame }
