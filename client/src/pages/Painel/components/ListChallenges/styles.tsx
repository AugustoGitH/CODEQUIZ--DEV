
import styled from 'styled-components';
import animationsPresence from '../../../../animations/presence';

const ListChallenges = styled.ul`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  .loading-quizzes{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
  .not-challenges-message {
    background: var(--color-gray-light);
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    ${animationsPresence.scale}
    font-size: var(--font-size-small);
    a {
      display: inline-block;
      background: var(--color-info);
      color: var(--color-light);
      padding: 0.4rem 1rem;
      border-radius: 0.3rem;
      margin-left: 0.5rem;
      cursor: pointer;
      font-size: var(--font-size-super-small);
      border: 1px solid var(--color-info);
      transition: 0.2s;
      &:hover {
        background: transparent;
        color: var(--color-info);
      }
    }
  }
  li {
    font-family: var(--font-Consolas);
    background: #22262e;
    height: 250px;
    border-radius: 0.4rem;
    position: relative;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    ${animationsPresence.scale};
    font-size: .9rem;
    color: var(--color-light);
    .header-challenge {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      transition: 0.2s;
      gap: 0.5rem;
      .line-code-span {
        white-space: nowrap;
        width: 100%;
        display: block;
        padding: 0.1rem 2rem;
        transition: 0.2s;
        color: var(--color-light);
        &:hover {
          background: #3a3d3e;
        }
      }
    }
    .button-open-quiz {
      background: transparent;
      border: none;
      font-family: var(--font-Consolas);
      width: 100%;
      padding: 0.2rem 1rem;
      cursor: pointer;
      text-align: start;
      transition: 0.2s;
      font-size: .9rem;
      color: var(--color-light);
      &:hover {
        background: #3a3d3e;
      }
    }
  }
`;

export { ListChallenges };
