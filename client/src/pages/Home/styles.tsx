import styled from 'styled-components'

const Apresentation = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: calc(70px + 2rem) 0;
  text-align: center;
  position: relative;
  @media (max-width: 1400px) {
    min-height: 100vh;
  }
  .gif-scroll{
    position: absolute;
    width: 100px;
    right: 0;
    bottom: .5rem;
  }
  .logo{
    margin-bottom: 1rem;
    width: 140px;
  }
  .techs-flooter{
    & i{
      position: absolute;
      font-size: 2rem;
      @media (max-width: 500px) {
        font-size: 1.4rem;
      }
    }
    .icon-react{
      right: 2rem;
      top: 10rem;
    }
    .icon-js{
      left: 1rem;
      top: 5rem;
    }
    .icon-css{
      top: 9rem;
      left: 5rem;
    }
    .icon-html{
      bottom: 3rem;
      left: 2rem;
    }
    .icon-node{
      right: 0rem;
      top: 6rem;
    }
    .icon-type{
      right: 8rem;
      bottom: 2rem;
    }
  }
  h1{
    font-size: calc(var(--font-size-super-large));
    text-transform: uppercase;
    margin-bottom: 1rem;
    line-height: 2.2rem;
    @media (max-width: 500px) {
        font-size: calc(var(--font-size-large) + .1rem);
        line-height: 1.4rem;
    }
  }
  h2{
    line-height: 1.2rem;
    font-size: 1rem;
    max-width: 650px;
    font-family: var(--font-Consolas);
    font-weight: 100;
    color: #000000b2;
    b{
      color: #000
    }
    @media (max-width: 500px) {
        font-size: var(--font-size-small);
        line-height: 1.2rem;
    }
    
  }
  nav{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    gap: .6rem;
    @media (max-width: 500px) {
      flex-direction: column;
      gap: .2rem;
    }
  }
`

const StartGame = styled.section`
  width: 100%;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
`

export { Apresentation, StartGame }
