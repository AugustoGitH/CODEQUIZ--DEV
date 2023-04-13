import styled from "styled-components";
import animationsPresence from "../../animations/presence";

const Container = styled.div``;

const FilterQuiz = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  .checkboxes-selected {
    width: 100%;
    p {
      font-size: var(--font-size-medium);
      margin-bottom: 0.7rem;
      font-family: var(--font-Consolas);
      @media (max-width: 500px) {
        font-size: var(--font-size-small);
      }
    }
  }
`;

const ListQuizzes = styled.ul`
  padding: calc(2rem + 1rem) 0;
  width: 100%;
  .message-not-quizzes {
    width: 100%;
    text-align: center;
    p {
      display: inline;
      background: var(--color-gray-light);
      padding: 0.7rem 2rem;
      text-transform: uppercase;
      border-radius: 0.4rem;
      border: 1.3px solid #0000004f;
      ${animationsPresence.scale};
    }
  }
  ul {
    width: 100%;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 0.5fr));
    @media (max-width: 760px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .quiz-game {
      height: 300px;
      cursor: pointer;
      .cover {
        height: 70%;
        background: #f0f0f0;
        border-radius: 0.4rem;
        border: 1.5px solid #282a36;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-tech {
          font-size: 4rem;
          color: #282a36;
          ${animationsPresence.scale};
        }
        .button-play-quiz {
          all: unset;
          display: flex;
          flex-direction: column;
          align-items: center;
          ${animationsPresence.scale};
          transition: 0.2s;
          &:hover {
            transform: scale(0.8);
          }
          i {
            font-size: 4rem;
            color: #282a36;
          }
          span {
            display: inline-block;
            margin-top: 0.4rem;
            background: #282a36;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
          }
        }
      }
      .description {
        height: 30%;
        padding-top: 0.5rem;
        .quiz-tags {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          li {
            background: #212329;
            color: #fff;
            padding: 0.3rem 1rem;
            text-transform: uppercase;
            border-radius: 0.3rem;
            font-size: var(--font-size-super-small);
            letter-spacing: 0.1rem;
          }
        }
        .display-time,
        .display-data {
          display: block;
          font-family: var(--font-Consolas);
          font-size: var(--font-size-small);
        }
      }
    }
  }
`;

export { Container, FilterQuiz, ListQuizzes };
