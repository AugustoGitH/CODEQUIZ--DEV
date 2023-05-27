import styled from "styled-components";



export const UserCreatedQuiz = styled.div`
  width: 100%;
  padding: 3rem 0;

`


export const InformationAboutTheQuiz = styled.div`
  width: 100%;
  padding: 3rem 0;
  h2{
    font-size: var(--font-size-medium);
    text-transform: uppercase;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: .5rem;
    margin-top: 1rem;
    li{
      background: var(--color-gray-light);
      color: #000000c0;
      padding: .4rem 1rem;
      font-size: .9rem;
      text-transform: uppercase;
      border: 1.4px solid #00000011;
      border-radius: .3rem;
      cursor: default;
    }
  }


`

export const ControllersEditQuiz = styled.div`
    width: 100%;
    .button-delete{
      all: unset;
      background: var(--color-danger);
      padding: .7rem 1rem;
      color: var(--color-light);
      text-transform: uppercase;
      font-weight: bold;
      border-radius: .4rem;
      font-size: .9rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: .4rem;
      border: 1.5px solid var(--color-danger);
      transition: .2s;
      &:hover{
        background: transparent;
        color: var(--color-danger)
      }
    }
`