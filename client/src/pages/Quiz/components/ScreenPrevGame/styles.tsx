import styled from 'styled-components'
import animationsPresence from '../../../../animations/presence'

export const ScreenPrevGame = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  @media (max-width: 730px) {
    padding: 2rem 0;
  }
  .card-start-game {
    text-align: center;
    background-color: var(--color-gray-light);
    padding: 4rem 4rem 2rem 4rem;
    border: 1.6px solid #0000002e;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${animationsPresence.scale};
    width: 800px;
    position: relative;
    @media (max-width: 730px) {
      width: 100%;
    }
    @media (max-width: 640px) {
      padding: 4rem 2rem 2rem 2rem;
    }
    h1 {
      font-size: calc(var(--font-size-large) + .1rem);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      line-height: 1.5rem;
      letter-spacing: -.1rem;
      position: absolute;
      top: -1.1rem;
      justify-content: center;
      background-color: var(--color-gray-light);
      padding: .4rem 1rem;
      border-radius: .4rem;
      border: 1.4px solid #0000002e;
      @media (max-width: 500px) {
        font-size: calc(var(--font-size-medium) + .1rem);
        line-height: 1.2rem;
      }
      @media (max-width: 620px) {
        width: calc(100% + 1rem);
      }
      i:nth-child(1) {
        transform: rotate(20deg);
        font-size: 1.7rem;
      }
      i:nth-child(2) {
        transform: rotate(-20deg);
        font-size: 1.7rem;
      }
    }

    ul {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.5rem;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1.8px solid var(--color-dark);
        box-shadow: 3px 3px var(--color-dark);
        border-radius: 0.5rem;
        height: 130px;
        padding: 1rem 2rem;
        cursor: default;
        transition: 0.2s;
        @media (max-width: 500px) {
          height: 100px;
          box-shadow: 2px 2px var(--color-dark);
        }
        &:hover {
          box-shadow: none;
          transform: translate(3px, 3px);
          @media (max-width: 500px) {
            transform: translate(2px, 2px);
          }
        }
        .infos-icon,
        .infos-icons-stars,
        .infos-description {
          width: 100%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
        }
        .infos-icons-stars,
        .infos-icons-stars {
          align-items: end;
          padding-bottom: 0.5rem;
        }
        .infos-icon {
          font-size: 2rem;
          @media (max-width: 500px) {
            font-size: 1.7rem;
          }
        }
        .infos-icons-stars {
          font-size: 1.3rem;
        }
        .infos-description {
          flex-direction: column;
          justify-content: start;
          h4 {
            font-size: var(--font-size-medium);
            line-height: 1.2rem;
            @media (max-width: 500px) {
              font-size: var(--font-size-small);
              line-height: 1.1rem;
            }
          }
          p {
            font-size: var(--font-size-small);
            font-family: var(--font-Consolas);
            @media (max-width: 500px) {
              font-size: var(--font-size-super-small);
            }
          }
        }
      }
    }
    nav {
      width: 100%;;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      margin-top: 2rem;
      @media (max-width: 640px) {
          flex-direction: column;
      }
      @media (max-width: 500px) {
        gap: .5rem;
      }
      button, a {
        all: unset;
        background: var(--color-dark);
        border: 1.4px solid var(--color-dark);
        color: var(--color-light);
        /* font-family: var(--font-Consolas); */
        font-size: var(--font-size-small);
        padding: 0.9rem 1.6rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 500px) {
          width: 100%;
          padding: 0.9rem 0;
          font-size: var(--font-size-super-small);
        }
        i {
          margin-left: 0.5rem;
        }
        &:hover {
          background-color: transparent;
          color: var(--color-dark);
        }
      }
    }
  }
`
