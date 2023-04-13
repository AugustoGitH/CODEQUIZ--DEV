import styled from 'styled-components'

const CreateQuiz = styled.div`
  padding: 2rem 0;

  .title-sumary {
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-size: var(--font-size-large);
    @media (max-width: 500px) {
        font-size: var(--font-size-medium);
    }
  }
  .title-create-quiz {
    line-height: 1rem;
    margin-bottom: 4rem;
    h1 {
      text-transform: uppercase;
      letter-spacing: -0.4px;
      font-family: var(--font-Consolas);
      font-size: 1.8rem;
      line-height: 1.6rem;
      font-size: var(--font-size-super-large);
      @media (max-width: 500px) {
        font-size: var(--font-size-large);
      }
      &::after,
      &::before {
        text-transform: lowercase;
        font-size: 0.8rem;
        margin: .4rem;
        color: #c8435a;
      }
      &::after {
        content: '<h1/>';
      }
      &::before {
        content: '<h1>';
      }
    }
  }
  .box-create-quiz {
    margin-bottom: 150px;
    .subject-box {
      background: #282c34;
      color: #fff;
      padding: 0.3rem 1rem;
      border-radius: 0.3rem;
      margin-bottom: 0.2rem;
      display: inline-block;
      text-transform: uppercase;
      font-size: var(--font-size-super-small);
    }
    .description-child {
      margin-bottom: 2rem;
      font-family: var(--font-Consolas);
      background: #f0f0f0;
      color: #000;
      padding: 0.4rem 1rem;
      border-radius: 0.4rem;
      font-size: var(--font-size-small);
      
      &::before {
        content: '>';
        margin-right: 0.7rem;
      }
      span {
        color: #9c0909;
      }
    }
  }
  #nav-buttons-finally {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    #button-add-quests,
    #button-created-quiz {
      all: unset;
      color: #fff;
      padding: 1rem 2rem;
      text-transform: uppercase;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: var(--font-size-small);
    }
    #button-add-quests {
      background: #4d4df6;
      border: 1.3px solid #4d4df6;
      transition: 0.2s;
      &:hover {
        background: transparent;
        color: #4d4df6;
      }
    }
    #button-created-quiz {
      background: #c8435a;
      border: 1.3px solid #c8435a;
      transition: 0.2s;
      &:hover {
        background: transparent;
        color: #c8435a;
      }
    }
    #button-created-quiz, #button-add-quests {
      @media (max-width: 550px) {
        width: 100%;
        text-align: center;
      }
    }
    .display-alert-questions {
      flex: none;
      align-items: center;
      font-family: var(--font-Consolas);
      background: #f2f2f2;
      font-size: var(--font-size-small);
      border-radius: 0.4rem;
      padding: 0.6rem 1rem;
      color: #000;
      cursor: default;
      @media (max-width: 550px) {
        width: 100%;
        text-align: center;
      }
      i {
        margin-right: 1rem;
      }
    }
  }
`

export { CreateQuiz }
