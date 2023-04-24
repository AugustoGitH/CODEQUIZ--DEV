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